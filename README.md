# node-gitio

A simple Node CLI wrapper for [git.io](https://github.com/blog/985-git-io-github-url-shortener). In Terminal, simply enter `gitio shrink` followed by the GitHub URL you would like to shrink and the shortened URL will be copied automatically to your clipboard.

Copying to clipboard is implemented via the [copy-paste](https://www.npmjs.com/package/copy-paste) package which supports OSX, Windows, Linux, and OpenBSD.



### Install

```
npm install -g node-gitio
```



### Usage

```
Usage: gitio <command>

Commands:

  shrink  Shrink a GitHub url

Options:

       --help, -h  Show the help menu.

    --version, -v  Show version number.

```
#### Shrink

```

Usage: gitio shrink <long url> [-c code] [-f]

Options:

       --code, -c  A custom code for the short link, e.g. http://git.io/mycode. (Optional)

      --force, -f  Try to shorten link even if the custom code has been used previously.
                   (Optional)

       --help, -h  Show the help menu.

```



### Node JS API

```javascript
var gitio = require('node-gitio');

/**
 * Using callbacks.
 */

gitio.shrink(payload, function (err, result) {
  if (!err) {
    console.log(result);
  }
});


/**
 * Using promises.
 */

 gitio.shrink(payload).then(function (result) {
   console.log(result);
 }).catch(function (err) {
   console.error(err);
 });
```

#### Payload

|Name|Type|Description|Required|
|:---|:--:|:----------|:------:|
|`url`|`string`|The GitHub URL to shorten.|Yes|
|`code`|`string`|A custom code for the short link, e.g. http://git.io/mycode.|No|
|`force`|`boolean`|Try to shorten link even if the custom code has been used previously.|No|



### Examples

1. Shorten `github.com/nathanbuchar/node-gitio`.

  ```bash
  $ gitio shrink github.com/nathanbuchar/node-gitio

  # => http://git.io/vZ9RJ (copied to clipboard)
  ```

2. Shorten `github.com/nathanbuchar/node-gitio` and attempt to use `nathan-gitio` as the custom code (if available).

  ```bash
  $ gitio shrink github.com/nathanbuchar/node-gitio -c nathan-gitio

  # => http://git.io/nathan-gitio (copied to clipboard)
  ```

3. Shorten `github.com/nathanbuchar/node-gitio` via Node JS and log the result.

  ```javascript
  var gitio = require('node-gitio');

  gitio.shrink({
    url: 'github.com/nathanbuchar/node-gitio'
  }, function (err, result) {
    if (!err) {
      console.log(result);
    }
  });
  ```
