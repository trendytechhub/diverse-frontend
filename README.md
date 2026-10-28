# DI-VERSE local SQL admin platform

## Start the app

1. Before the first run, configure the `DIVERESE_OWNER_EMAIL` and `DIVERESE_ADMIN_PASSWORD` Windows environment variables. Use the owner email you will sign in with and a unique password of at least 16 characters. Do not put the password in source files or share it. Then run `start-local.bat`. On first run, the server creates the `DIVerseAccounts` database and its tables in this Windows user's SQL Server LocalDB instance and stores only a salted password hash. These variables are needed only to create the initial owner account; on later runs the owner email is read from the existing database.
2. Keep the PowerShell window open. The app opens at `http://127.0.0.1:8765/`. Do not open `index.html` directly as a file; the local server is required for authentication and database access.
3. The owner admin account is provisioned automatically on first run from those environment variables. Open **Admin access** and sign in with the configured owner email and admin password. Existing databases keep their current owner account.
4. Use the sign-up form to add accounts, then sign in to reach the authenticated homepage and open the DI-VERSE community. Regular sign-in does not lock users out after repeated mistakes; incorrect passwords receive a short increasing retry delay. Admin sign-in retains its attempt limit.
5. Close the server window or press Ctrl+C when finished.

## Community pages

The signed-in community contains a profile editor, friend search and requests, friend-only direct messages, shared posts, a PDF library (10 MB maximum per file), business/job/skill/product listings, a movie library for MP4/WebM files up to 4 hours and 4 GB, and a game room for chess, ludo, whot, and snooker. Movies are stored as SQL chunks and streamed to signed-in members. Uploaders must own or have permission to share each movie. Game tables can be free or use non-redeemable virtual-credit stakes. Each account receives 1,000 virtual credits once; a confirmed win pays 90% of the virtual-credit pot, the remainder is removed from play, and a mutually confirmed draw refunds both entries. Credits cannot be purchased, transferred, or withdrawn and have no cash value. Members can report accounts; banned members can submit an appeal for admin review. The admin dashboard supports user search, recent-online counts, bans/unbans, report review, and appeal decisions. The Friend Map shares a user's location only after they opt in; location is visible to accepted friends and expires after 10 minutes.

## Privacy and storage

- The server listens on `127.0.0.1` only; it is not published to the internet.
- The `DIVerseAccounts` SQL Server LocalDB database belongs to the current Windows user's LocalDB instance and uses Windows integrated authentication.
- `database.sql` defines the account and single-owner admin tables. The app uses parameterized SQL commands; no database password is stored in the web files.
- Passwords are salted and hashed on the server. The admin list never exposes passwords or password hashes.
- Admin account listing requires the owner email, the admin password, and a server-side session. Regular users can retrieve only their own profile.
- Banned accounts cannot use normal app routes, but can submit an unban appeal through the restricted appeal page. The appeal and scam-report queues are visible only to the owner admin.
- Online counts reflect signed-in user sessions active within the last 10 minutes and reset when the local server restarts.
- Movie data is stored in 1 MB chunks in LocalDB. Uploads are capped at 4 hours and 4 GB and require an ownership/permission confirmation; only MP4 and WebM signatures are accepted. SQL Server LocalDB has a 10 GB database size limit, so available movie storage depends on the rest of the database.
- The owner email is an allowlist; this local app does not verify Gmail ownership or send email.
- Anyone with access to your Windows account can potentially access its LocalDB instance. Lock your computer and keep the admin password private.
- This is a local app, not a hosted website. Do not put real users' data into it if you need remote access, backups, or production-grade operations.

The app requires Windows PowerShell and SQL Server LocalDB.
