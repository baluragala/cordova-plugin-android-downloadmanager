
module.exports = new DownloadManager()

function DownloadManager () {
}

DownloadManager.prototype.enqueue = function(req, cb) {
  if (typeof req === 'string') req = {uri: req}
  if (req.url) req.uri = req.url

  
  exec('enqueue', [req], cb)
}

DownloadManager.prototype.query = function(filter, cb) {
  if (typeof filter === 'function') {
    cb = filter
    filter = null
  }

  if (filter == null) filter = {}

  

  exec('query', [filter], cb)
}

DownloadManager.prototype.remove = function(ids, cb) {
 
  exec('remove', ids, cb)
}

function exec (method, args, cb) {
  if (cb == null) cb = noop
  cordova.exec(onsuccess, onerror, 'DownloadManagerPlugin', method, args || [])

  function onsuccess () {
    var args = Array.prototype.slice.call(arguments)
    args.unshift(null)
    cb.apply(null, args)
  }

  function onerror (err) {
    err = (err instanceof Error) ? err : new Error(err)
    cb(err)
  }
}

function noop () {}
