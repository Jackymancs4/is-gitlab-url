# is-gitlab-url

>  Check if a passed string is a valid GitHub URL

Unlike [is-git-url](https://gitlab.com/jonschlinkert/is-git-url), is-gitlab-url is a domain-specific validator. It returns `true` if passed URL is a part of `gitlab.com` domain only.

## Installation
```
$ npm install is-gitlab-url --save
```

## Usage
```js
var isGitlabUrl = require('is-gitlab-url');

// Valid examples
isGitlabUrl('https://gitlab.com/facebook');
 // => true
isGitlabUrl('https://gitlab.com/facebook/react');
 // => true
isGitlabUrl('https://gitlab.com/facebook/react/releases/tag/v0.14.0');
// => true
isGitlabUrl('git@gitlab.com:facebook/react.git');
// => true
isGitlabUrl('git://gitlab.com/facebook/react.git#gh-pages');
// => true

// Invalid examples
isGitlabUrl('https://google.com');
 // => false
isGitlabUrl('unknown://gitlab.com');
// => false
isGitlabUrl('http://facebook.gitlab.io/');
// => false

// Repository mode can be used to check whether a passed URL
// is a valid repository URL
isGitlabUrl('https://gitlab.com/facebook/react', { repository: true });
// => true
isGitlabUrl('https://gitlab.com/facebook', { repository: true });
// => false
isGitlabUrl('https://gitlab.com/facebook/react/releases/tag/v0.14.0', {
  repository: true
});
// => false

// Strict mode is used to validate URLs before cloning
// Strict mode turns on automatically if URL contains git protocol
isGitlabUrl('https://gitlab.com/facebook/react.git', { strict: true });
// => true
isGitlabUrl('https://gitlab.com/facebook/react', { strict: true });
// => false
```

## API
### `isGitlabUrl(url, [options])`
Check if a passed string is a valid GitHub URL

#### Params
- **String** `url`: A string to be validated
- **Object** `options`: An object containing the following fields:
  - `strict` (Boolean): Match only URLs ending with .git
  - `repository` (Boolean): Match only valid GitHub repo URLs

## License
MIT © [Giacomo Rossetto](https://github.com/Jackymancs4)
