# All commit styles

### Conventional commits

```md
<type>(<scope>): <message>
<BLANK LINE>
[optional body]
[optional footer]
```

- Type: Defines the kind of change (e.g., feat, fix, chore, etc.).
- Scope: A specific part of the project (optional).
- Message: A brief description of the change.

Example:

```md
feat(auth): add login functionality
fix(api): resolve bug with data fetching
chore(tests): add unit tests for user model
```

- feat: A new feature (e.g., new functionality or API endpoint).
- fix: A bug fix (e.g., patching a bug or error).
- docs: Documentation only changes.
- style: Code style changes (e.g., formatting, linting fixes).
- refactor: Code change that neither fixes a bug nor adds a feature.
- perf: Performance improvements.
- test: Adding or modifying tests.
- chore: Maintenance tasks like updating build tools, dependencies, etc.

### Gitmoji commits 

```md
:emoji: <message>
```

Example:

```md
:rocket: add new API endpoint for users
:bug: fix issue with session timeout
:fire: remove deprecated method
```

- `:sparkles:` → New feature
- `:bug:` → Bug fix
- `:fire:` → Code deletion
- `:rocket:` → Performance improvements or new features
- `:memo:` → Documentation
- `:art:` → Code refactor for style improvements
- `:lock:` → Security improvements
- `:wrench:` → Configuration changes
- `:package:` → Adding or updating packages
- `:lipstick:` → UI changes

### Emoji-Only Commits

```md
:rocket:
```

### Imperative Mood (Traditional Style)

```md
<imperative-verb>: <message>
```

Example:

```md
Add login page
Fix session timeout issue
Remove deprecated API endpoint
```

### Semver (Semantic Versioning)

- MAJOR: Breaking changes (e.g., removing features or APIs).
- MINOR: New features that are backwards-compatible.
- PATCH: Bug fixes or minor improvements.

Example:

```md
MAJOR: Remove deprecated methods
MINOR: Add user profile feature
PATCH: Fix issue with session expiration
```