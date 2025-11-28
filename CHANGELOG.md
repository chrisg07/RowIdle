# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.1](https://github.com/chrisg07/RowIdle/compare/v0.2.0...v0.2.1) (2025-11-28)


### Bug Fixes

* moved stat and state related logic to specific files for clarity ([100dcac](https://github.com/chrisg07/RowIdle/commit/100dcac301d03aa51c4758dde18376df52a86471))
* refactored current spm display to use StatDisplay class ([614c72e](https://github.com/chrisg07/RowIdle/commit/614c72ead39086b42df10e2bbfc106b65fb85e64))
* refactored currentSPM calculation to shared function ([f4cd80d](https://github.com/chrisg07/RowIdle/commit/f4cd80d16d60135d146ebff4fa079d5be6e20050))
* refactored distance display to use StatDisplay class ([34baba0](https://github.com/chrisg07/RowIdle/commit/34baba0e54e724844b9974b4076c9a773996f8a6))
* refactored drag display to use StatDisplay class ([2cb561a](https://github.com/chrisg07/RowIdle/commit/2cb561abde8c3c4a32ec08b8ecaa11b5831a4d8c))
* refactored max SPM display to use StatDisplay class ([d241e61](https://github.com/chrisg07/RowIdle/commit/d241e615df5b91caad77e0ede7f5eb94fd485a8c))
* refactored new stat display to map so they can be iterated over as list grows ([12dd7f7](https://github.com/chrisg07/RowIdle/commit/12dd7f7b08776886befdcf25c1c9b9f1033c738b))
* refactored row level display to use StatDisplay class ([d8e5da4](https://github.com/chrisg07/RowIdle/commit/d8e5da4357ca46b24f9adcbea990b0afa33d4123))
* refactored speed display to use StatDisplay class ([155cdd2](https://github.com/chrisg07/RowIdle/commit/155cdd2deae941b5b157df07f478e035db3f1f46))
* refactored state stat display logic to class, refactored energy display to use new class ([0238790](https://github.com/chrisg07/RowIdle/commit/023879002062f414d786dcd89e0a8117f3868afb))
* updated template and styles so that sections are displayed in columns instead of rows ([8eae810](https://github.com/chrisg07/RowIdle/commit/8eae810d8600a0bfbc1bb0cbe84841c01077379e))

## [0.2.0](https://github.com/chrisg07/RowIdle/compare/v0.1.0...v0.2.0) (2025-11-26)


### Features

* display of current SPM ([7bec1b5](https://github.com/chrisg07/RowIdle/commit/7bec1b5b37ff47a9872663b61c8d95cd278e076a))
* Drag, how much the player slows down while not rowing, is now displayed along other stats ([090d3f4](https://github.com/chrisg07/RowIdle/commit/090d3f443616f413e58d9b31f7df29a64d245908))
* Max SPM, its display, and disabling of row button when max SPM is exceeded ([6489d72](https://github.com/chrisg07/RowIdle/commit/6489d72c240b1a1151608b0f2230e550b629f710))


### Bug Fixes

* distance is gained per tick based on players speed ([8e2a02c](https://github.com/chrisg07/RowIdle/commit/8e2a02c8b3ea52e2e5e428c9b20f090d67a11189))
* increased range of strokes uses to calculate SPM from 10 seconds to 20 ([b062018](https://github.com/chrisg07/RowIdle/commit/b0620182ba0488c7958bfe2013e7aac3df211664))
* speed now increases with rowLevel ([1650a94](https://github.com/chrisg07/RowIdle/commit/1650a94759447992b2fd0bd78511403b54a04407))

## [0.1.0](https://github.com/chrisg07/RowIdle/compare/v0.0.4...v0.1.0) (2025-11-20)


### Features

* added .versionrc config ([cd17f9a](https://github.com/chrisg07/RowIdle/commit/cd17f9a668336dcd7bf818eb2f757f88034cfb89))

### [0.0.4](https://github.com/chrisg07/RowIdle/compare/v0.0.3...v0.0.4) (2025-11-20)


### Features

* added distance milestones ([d4bd510](https://github.com/chrisg07/RowIdle/commit/d4bd510b599ca0a5e04fa68e307b4c05aaca2912))


### Bug Fixes

* commit prefix context for readme ([9ae4889](https://github.com/chrisg07/RowIdle/commit/9ae4889f631a83e7b42dce150d8a179c6c2278a9))

### 0.0.3 (2025-11-20)


### Features

* added standard-version for versioning automation ([1942c77](https://github.com/chrisg07/RowIdle/commit/1942c77976038cfdb47abe5e94ce5585fc291adf))


### Bug Fixes

* manually reset version before initial release ([93d6003](https://github.com/chrisg07/RowIdle/commit/93d6003c66fe2f7af72e69fe325263d538024503))
