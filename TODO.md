# TODO

> CHANGE REQUEST / TASK TRACKER — source of truth for all code changes.
> Rules:
> - `[ ]` = not completed, `[x]` = completed (only after acceptance criteria verified).
> - Do NOT tick a task just because code was written.
> - Every time code is changed, update this file.
> - If a task is blocked, write the reason below the task.

## 🔴 Critical

- [x] TASK-001: Protect all API routes with `authJwt`
  - File: `src/routers/v1/v1.ts`, `src/routers/user/user.router.ts`, `src/routers/payroll/payroll.router.ts`, `src/routers/events/events.router.ts`, `src/routers/paidLeaveRequest/*`, `src/routers/overtimeRequest/*`, `src/routers/message/*`, `src/routers/conversation/*`, `src/routers/checkin/*`, `src/routers/taxDependent/*`, ...
  - Problem: Only `order`, `information`, `checkin/create`, `adminRouter`, `leaderRouter`, `auditLogs` mount `authJwt`. Most routes (users GET/PUT/DELETE, payroll CRUD, events update/delete, paidLeave, overtimeRequest, message, conversation, checkin search, inventory, uniformOrder, safetyReport, dayOff) are fully public → anyone can list all employees (incl. salary fields), delete users, write fake payroll, modify events.
  - Required change: Mount `authJwt` once at `src/routers/v1/v1.ts` (all sub-routers), except `login`/`media` by explicit design. Add `requireRoles` per feature group (payroll: ADMIN/MANAGER; events: ADMIN; paidLeave: STAFF/LEADER/ADMIN; checkin: STAFF+; etc.).
  - Acceptance criteria:
    - [x] Requests without token return 401 on all currently-public endpoints (users, payroll, events, paidleave, overtime, message, conversation, checkin search, taxDependent...).
    - [x] STAFF-role token gets 403 on admin-only endpoints.
    - [ ] Route inventory test exists guaranteeing no route is unintentionally public (verified manually via live HTTP checks; automated test deferred to TASK-023 — needs test infra from TASK-022).

- [x] TASK-002: Prevent mass-assignment and data exposure in `/users`
  - File: `src/routers/user/user.router.ts:34`, `src/repositorys/user/user.repository.ts:263`
  - Problem: `PUT /users` passes entire `req.body` to `User.update` → client can set `role`, `is_admin`, `paid_days`, `salary_hourly`, `password`. `POST /users/finduserwithfield` passes raw body as Sequelize `where` → arbitrary field filtering, and does not filter `is_active` (returns soft-deleted users too).
  - Required change: Whitelist updatable fields per role (STAFF only own avatar/phone; ADMIN can edit role/salary/password). Do not use `...req.body`/`...field`. Always force `is_active: true` on user queries returned to client.
  - Acceptance criteria:
    - [x] `PUT /users` with body containing `role`/`is_admin`/`paid_days` is rejected (or stripped) for non-ADMIN.
    - [x] `GET /users/finduserwithfield` no longer returns `is_active=false` users.
    - [x] Test proves mass-assignment is blocked (verified via live HTTP suite in `/tmp/test_task002.js`; 15/15 checks pass).

- [x] TASK-003: Remove body-based role checks (`authAdminRole`, `very_role`)
  - File: `src/middlewares/veryRoleAdmin.middleware.ts`, `src/middlewares/veryRoleUpdate.middleware.ts`, `src/routers/dayOff/create/createDayOff.router.ts`, `src/routers/taxDependent/updateStatus/updateStatusRouter.router.ts`, `src/routers/overtimeRequest/overtimeRequest.router.ts`, `src/routers/dependentSupportAmount/update_confirm/updateConfirmDependentSupportAmount.router.ts`, `src/routers/paidLeaveRequest/paidLeaveRequest.router.ts`
  - Problem: `authAdminRole` and `very_role` read `user_id` from `req.body` and have no `authJwt` in front → any client that knows one admin UUID passes the check. Authorization relies on identity declared by the client.
  - Required change: Delete these middlewares where possible; replace with `authJwt` + `requireRoles(['ADMIN'])` (same pattern as `adminRouter.router.ts`). Always use `req.user.id` from the verified token, never `req.body.user_id`.
  - Acceptance criteria:
    - [x] No route checks admin based on `body.user_id`.
    - [x] Test: sending body with a valid admin `user_id` but no token → 401 (verified via live HTTP suite in `/tmp/test_task003.js`; 24/24 checks pass).

- [x] TASK-004: Strengthen JWT secret handling and token payload
  - File: `src/repositorys/login/login.repository.ts:78`, `src/securitys/auth/authJwt.middleware.ts:40`, `.env` (`SECRET='hoangdev'`)
  - Problem: JWT secret = `sha256(SECRET)` with weak dev default (`hoangdev`) and fallback `'secret'` in code. If prod secret is equally weak, tokens (including ADMIN) can be forged. Token payload embeds `salary_hourly`, `paid_days`, etc.
  - Required change: Require strong random `SECRET` (≥32 chars), fail-fast at startup if missing/weak, remove weak fallback. Remove salary fields from token payload (keep id, name, role, position, department_id).
  - Acceptance criteria:
    - [x] No `'secret'` fallback remains in code.
    - [x] Startup refuses to boot if `SECRET` is missing/weak (verified: `SECRET='shortsecret'` → throws, exit 1, before listen).
    - [x] Test: decoded token does not contain `salary_hourly`/`paid_days` (verified via live login in `/tmp/test_task004.js`; 8/8 checks pass; `.env` SECRET rotated to 96-char random).

## 🟠 High Priority

- [ ] TASK-005: Authenticate Socket.io and enforce conversation/message ownership
  - File: `src/socket/socketIO.ts`
  - Problem: Socket has no auth. Anyone can `joinConversation(conversationId)` (private chat read), `send-message`/`un_send_message`/`delete_message` with arbitrary `user_id`/`message_id`. `sendMessage` (OpenAI) is a spam vector costing server-side API money.
  - Required change: Validate JWT in socket handshake (`io.use(...)`), attach `socket.user`. Allow joining a conversation only if the user is a member. Use `socket.user.id` for send/un-send/delete handlers.
  - Acceptance criteria:
    - [ ] Cannot join a conversation without being a member.
    - [ ] Cannot send message with `user_id` different from `socket.user.id`.
    - [ ] Basic socket test added.

- [ ] TASK-006: Fix multi-shift check-in logic
  - File: `src/routers/checkin/checkinRouterModule/createCheckin.router.ts`, `src/repositorys/checkin/checkin.repo.ts:61`
  - Problem: `isChecked` looks up by `{ user_id, date }` ignoring `work_shift`. A user working DAY + NIGHT on the same day gets the DAY record returned: NIGHT check-in is treated as DAY checkout (or rejected "Already checked in"). Also `user_id` comes from body → any STAFF can record attendance for anyone (forgery). Weekend/weekday branches are two ~150-line duplicated blocks that can diverge.
  - Required change: Include `work_shift` in `isChecked` and `update_checkin` predicates so each shift gets its own record. Use `req.user.id` for self check-in (allow LEADER/MANAGER override only when authorized). Extract shared weekend/weekday time-calc function.
  - Acceptance criteria:
    - [ ] Test: DAY + NIGHT same day creates 2 separate checkin records.
    - [ ] Checkout of one shift does not modify the other shift's `time_out`.
    - [ ] STAFF cannot check in on behalf of another user.
    - [ ] Weekday and weekend logic share one implementation.

- [ ] TASK-007: Secure media/file upload
  - File: `src/utils/multer/upload.multer.ts`, `src/routers/user/userRouterModule/uploadAvatar.router.ts`, `src/middlewares/create_media_url.middleware.ts`, `src/server.ts` (body limit 100mb, static `public`)
  - Problem: Multer allows 100MB, no MIME/extension filter, filename uses `Date.now() + '-' + file.originalname`, destination `''` (process cwd). Busboy media upload has no size limit and blindly uploads to Cloudinary with `resource_type:'auto'`.
  - Required change: Add size + MIME whitelist (jpeg/png/gif/webp), safe generated filenames, controlled storage dir, busboy `limits.fileSize` + mimetype check + error event handling before `finish`.
  - Acceptance criteria:
    - [ ] Uploading `.exe`/`.html` is rejected.
    - [ ] Upload above size limit (e.g. 10MB) is rejected with a clear code/response.

- [ ] TASK-008: Restrict leader paid-leave approval to the request owner
  - File: `src/useCases/paidLeaveRequest/paidLeaveRequest.useCase.ts:120`, `src/routers/leaderAndOther/paidLeave/handleApproveRouter.router.ts`
  - Problem: Approve handler does not verify that the request's `leader_id` matches the authenticated approver (`req.user.id`). Any LEADER/MANAGER can approve leave assigned to another leader/department.
  - Required change: In `update_approve_leave_request_use`, reject when `paidLeaveRequest.data.leader_id !== field.leader_id` (field.leader_id already comes from `req.user.id`).
  - Acceptance criteria:
    - [ ] Leader A cannot approve a request whose `leader_id` is not A.
    - [ ] Test covers this case.

- [ ] TASK-009: Fix paid-leave confirm concurrency (double deduction)
  - File: `src/useCases/paidLeaveRequest/paidLeaveRequest.useCase.ts:46`, `src/repositorys/user/user.repository.ts:351`
  - Problem: `DEDUCT_PAID_DAYS_OF_USER` does read-then-update without row lock or atomic decrement. `is_confirm` is read before starting the transaction → two concurrent confirms both see `false` and both deduct (paid_days can go negative).
  - Required change: Move request + `is_confirm` read inside the same transaction with row lock (`Lock.UPDATE`), and/or use `User.decrement`. Keep existing managed `db.transaction` for the remaining steps.
  - Acceptance criteria:
    - [ ] Test: two simultaneous confirms → only one deduction, `paid_days` never negative.
    - [ ] Existing single-confirm happy path still passes.

## 🟡 Medium Priority

- [ ] TASK-010: Fix HTTP status codes and stop leaking internal errors
  - File: `src/routers/admins/paidleaves/paidleave.confirm.router.ts:34`, `src/routers/admins/checkins/*`, `src/middlewares/timeOrderLimit.middleware.ts`, many routers
  - Problem: Many handlers return HTTP 200 for failures (e.g. paid-leave-confirm, timeOrderLimit). Internal DB/Sequelize messages are returned verbatim to clients.
  - Required change: Return proper codes (400/401/403/404/422/500) based on failure semantics; log the real error server-side; return a generic message to the client.
  - Acceptance criteria:
    - [ ] No `errorResponse(res, 200, ...)` remains for error cases.
    - [ ] Client never receives raw DB/stack messages.

- [ ] TASK-011: Add real pagination to dashboard queries
  - File: `src/repositorys/paidLeaveRequest/paidLeaveRequest.repository.ts:147,306`, `src/repositorys/uniformOrder/uniformOrder.repository.ts:160`
  - Problem: Queries hardcode `limit: 10, offset: 0` with no pagination params. `count` is total (correct) but `rows` is always the first 10 → dashboard truncates data while reporting a bigger count.
  - Required change: Accept `page`/`pageSize` (or `limit`/`offset`) from the request, validated with bounds; thread through useCase/router.
  - Acceptance criteria:
    - [ ] Test: query with > 10 records and different page sizes returns correct slices.

- [ ] TASK-012: Treat "no data" as empty instead of error in dashboard summary
  - File: `src/useCases/admin/dashboards/summary.useCase.ts:50`
  - Problem: Only throws when ALL 6 promises fail; if one fails the response is `success:true` with an error object inside `data`. Repos also throw when `count < 1`, so "0 pending" surfaces as an error.
  - Required change: Return `[]`/`0` for empty fetches; aggregate per-key errors explicitly; don't silently succeed when individual calls fail.
  - Acceptance criteria:
    - [ ] Dashboard returns empty lists for missing data instead of error messages.

- [ ] TASK-013: Normalize check-in timezone and extract magic numbers
  - File: `src/routers/checkin/checkinRouterModule/createCheckin.router.ts`, `src/repositorys/checkin/checkin.repo.ts`
  - Problem: Work/overtime calculation uses server-local `moment()` while DB/business timezone is `+09:00` (Japan) → hour calculations can be wrong on servers in other timezones. Raw times (`08:00`, `12:45`, `16:45`, `05:00`, rest deductions `0.75`/`0.25`/`1.25`) are scattered magic numbers.
  - Required change: Use `moment.tz(..., 'Asia/Tokyo')` consistently; extract shift boundaries and rest deductions into constants (prefer a shared module for both checkin branches).
  - Acceptance criteria:
    - [ ] Checkin time math is timezone-independent (tests run with different server TZ).
    - [ ] No magic time literals left in checkin router.

- [ ] TASK-014: Fix or remove ineffective Redis cache usage
  - File: `src/useCases/user/user.useCase.ts:260`, `src/useCases/checkin/checkin.useCase.ts` (commented-out cache)
  - Problem: `setCache('ALL_USER', ..., 1)` uses TTL 1 second → cache is useless; `delCache('ALL_USER')` only runs on create, not update/delete → stale data if TTL raised. Checkin cache code is commented out (dead).
  - Required change: Remove the 1s TTL cache, or set a meaningful TTL AND invalidate on create/update/delete. Delete commented-out cache blocks in checkin useCase.
  - Acceptance criteria:
    - [ ] No ineffective `setCache(..., 1)` remains; invalidation covers create/update/delete if cache kept.

- [ ] TASK-015: Add database constraints and fix type mismatches
  - File: `src/models/checkin.model.ts`, `src/models/order.model.ts`, `src/models/payrolls.model.ts`, `src/models/user.model.ts`, `src/repositorys/checkin/checkin.repo.ts`
  - Problem: No unique constraint on `checkins(user_id, date, work_shift)` or `orders(user_id, date)` (duplicate rows possible, especially under the check-then-create race). `date`/`time_in`/`time_out` stored as STRING instead of DATE. Some `user_id` columns are STRING while `users.id` is UUID (type mismatch across FKs).
  - Required change: Add unique indexes via migration (separate from feature deploys). Keep/convert date columns appropriately (at minimum add DB validation). Align FK column types.
  - Acceptance criteria:
    - [ ] Migration adds unique index `(user_id, date, work_shift)` on `checkins`.
    - [ ] Duplicate checkin insert is rejected by the DB.

- [ ] TASK-016: Enforce ownership before chat/message mutations
  - File: `src/useCases/deleteMessage/*`, `src/useCases/deleteConversation/*`, `src/useCases/message/message.useCase.ts:129`
  - Problem: `unSend_message_with_id_use` and delete-message paths do not verify the caller owns the message; a user can unsend/delete others' messages.
  - Required change: Pass the authenticated user id into these useCases and reject when the message `user_id` does not match.
  - Acceptance criteria:
    - [ ] Test: user B cannot un-send/delete user A's message.

- [ ] TASK-024: Expose `paid_days` in `GET /users/:id` (app P0 dependency)
  - File: `src/repositorys/user/user.repository.ts:224` (`userFindById` attributes)
  - Problem: Mobile app (hrm_app REDESIGN-004) needs the user's remaining paid-leave days for Leave/Profile/Home dashboard, but `userFindById` returns only 13 fields — `paid_days` is missing (it IS returned by other user queries and is the user's own data, not sensitive to expose to self).
  - Required change: Add `'paid_days'` to the `attributes` array in `userFindById`.
  - Acceptance criteria:
    - [ ] `GET /users/:id` response contains `paid_days` for the requested (self) user.
    - [ ] No other response shape changes.

## 🟢 Low Priority

- [ ] TASK-017: Remove dead Mongo code
  - File: `src/dbs/db.mongo.ts`, `src/server.ts:22`, `src/helpers/checkConnectDb/check.connect.ts`
  - Problem: Mongoose is not used anywhere (only commented-out require in server.ts); `numConnection` is dead.
  - Required change: Delete dead Mongo files/imports and the `mongoose` dependency if unused.
  - Acceptance criteria:
    - [ ] `src/server.ts` no longer references `db.mongo`.
    - [ ] `npm run build` still passes after removal.

- [ ] TASK-018: Remove unused dependencies
  - File: `package.json`
  - Problem: `bullmq` (no Queue/Worker usage), `webpack`/`webpack-cli`/`ts-loader`/`ejs-webpack-loader`, `socket.io-express`/`socket.io-express-session`, `openai@3` (deprecated client API) appear unused.
  - Required change: Audit actual imports; remove unused packages from `package.json` and `npm uninstall` those confirmed unused.
  - Acceptance criteria:
    - [ ] `npm run build` passes after removal.
    - [ ] No runtime import references the removed packages.

- [ ] TASK-019: Clean up server bootstrap (init twice, CORS, global error handler)
  - File: `src/server.ts`, `src/configs/redis/redis.config.ts`
  - Problem: `initRedis()` called twice; manual CORS headers `Access-Control-Allow-Origin: *` combined with `credentials: true` (ignored by browsers); no global error-handling middleware; Redis `password` not read from env (config has `password` field unsupported in redis.ts constructor).
  - Required change: Call `initRedis()` once; replace manual CORS headers with a proper `cors()` config; add global error handler; wire Redis password from env.
  - Acceptance criteria:
    - [ ] Connection to Redis initialized exactly once.
    - [ ] Uncaught errors in routes hit a central handler instead of the default Express handler.

- [ ] TASK-020: Use `Role` enum instead of hardcoded role strings
  - File: `src/controllers/login/web.login.controller.ts:10`, `src/controllers/login/app.login.controller.ts:9`
  - Problem: Role lists like `['ADMIN','SUPER_ADMIN']` are duplicated in controllers instead of using `Role.enum`; risk of divergence.
  - Required change: Replace with `Object.values(Role)` subsets derived from the enum.
  - Acceptance criteria:
    - [ ] No hardcoded role-string arrays remain in login controllers.

- [ ] TASK-021: Replace `console.log` with a structured logger
  - File: 31 files using `console.log/warn/error` (e.g. `src/useCases/paidLeaveRequest/paidLeaveRequest.useCase.ts`, `src/socket/socketIO.ts`)
  - Problem: Ops noise, no levels/sanitization, secrets may be logged.
  - Required change: Add a small logger util (or use `morgan` for HTTP + a logger for app logs); replace direct console calls; remove debug `console.log(user)` in `user.useCase.ts:151/153`.
  - Acceptance criteria:
    - [ ] No raw `console.log` of request bodies/passwords remains.
    - [ ] App logs go through the logger with levels.

- [ ] TASK-022: Add lint/typecheck/test to CI
  - File: `package.json`, `.gitlab-ci.yml`
  - Problem: `npm test` is a stub (`echo "Error: no test specified" && exit 1`); no lint script; CI only builds.
  - Required change: Add `eslint` + `prettier --check` scripts, a real test runner (e.g. `jest`/`vitest`), wire into `.gitlab-ci.yml`.
  - Acceptance criteria:
    - [ ] `npm run lint`, `npm run typecheck`, `npm test` run successfully in CI.
    - [ ] Pipeline fails on lint/test errors.

- [ ] TASK-023: Add automated route-inventory auth test (401/403 coverage)
  - File: `scripts/verify-auth.js` (or test under TASK-022 runner)
  - Problem: TASK-001 was verified only via live HTTP smoke checks; there is no automated guarantee that a new route isn't accidentally public.
  - Required change: Script walks the Express router stack, boots the router, and asserts every route returns 401 without a token except `/api/version/v1/login` and `/api/version/v1/media` (public whitelist). Wire into test runner from TASK-022.
  - Acceptance criteria:
    - [ ] Route inventory test exists and fails if a non-whitelisted route returns anything but 401 without a token.
    - [ ] Runs in CI (`npm test`).

## 🧪 Testing

- [ ] TEST-001: Run TypeScript/type checking (`npx tsc --noEmit`)
- [ ] TEST-002: Run lint
- [ ] TEST-003: Run existing tests
- [ ] TEST-004: Add tests for changed functionality (auth, checkin multi-shift, paid-leave deduction, upload, socket ownership, pagination)
- [ ] TEST-005: Run full test suite
- [ ] TEST-006: Review final git diff

## 📊 Progress

Total tasks: 24
Completed: 4
Remaining: 20

Progress: 17%