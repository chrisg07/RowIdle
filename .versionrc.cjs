module.exports = {
  preset: 'conventionalcommits',
  releaseRules: [
    { type: 'feat', release: 'minor' },
    { type: 'fix', release: 'patch' },
    { type: 'refactor', release: 'patch' },
    { type: 'perf', release: 'patch' },
    { type: 'chore', release: false },
    { type: 'docs', release: false },
    { type: 'test', release: false },
  ],
}
