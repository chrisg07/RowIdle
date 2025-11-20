```text
 ███████████                            █████     █████ ████
░░███░░░░░███                          ░░███     ░░███ ░░███
 ░███    ░███   ██████  █████ ███ █████ ░███   ███████  ░███   ██████
 ░██████████   ███░░███░░███ ░███░░███  ░███  ███░░███  ░███  ███░░███
 ░███░░░░░███ ░███ ░███ ░███ ░███ ░███  ░███ ░███ ░███  ░███ ░███████
 ░███    ░███ ░███ ░███ ░░███████████   ░███ ░███ ░███  ░███ ░███░░░
 █████   █████░░██████   ░░████░████    █████░░████████ █████░░██████
░░░░░   ░░░░░  ░░░░░░     ░░░░ ░░░░    ░░░░░  ░░░░░░░░ ░░░░░  ░░░░░░
```

## Resources

- https://www.asciiart.eu/text-to-ascii-art

## Contributing

- Use Conventional Commit prefixes so releases can be cut automatically:
  - `feat: ...` bumps a **minor** version.
  - `fix: ...` bumps a **patch** version.
  - `feat!:`/`fix!:` or adding a `BREAKING CHANGE:` footer bumps a **major** version.
- Keep other prefixes conventional (`chore:`, `docs:`, `refactor:`, `perf:`, `test:`) to keep the changelog clean.
- When ready to release, run your release script (e.g., `npm run release` with `standard-version`) to update the version, changelog, and tag, then `git push --follow-tags`.

## To-Do

- Metronome style interaction with row button to provide active bonus when rowing with 'rhythm'
- Track distance traveled
- Display toast when autosaving
- Display passive energy gain per second
- Improve Milestones visualization (add animation)
- Add fluctuations to speed to make it seem more realistic
- Add the ability to add additional rowers to increase speed
