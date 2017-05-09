var express = require('express')
var app = express()
var moment = require('moment')
var path = require('path')

var port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/:query', function(req,res) {
  var stamp
  if(/^\d{8,}$/.test(req.params.query)) {
    stamp = moment(req.params.query, "X")
  } else {
    stamp = moment(req.params.query, "MMMM D, YYYY")
  }

  if(stamp.isValid()) {
    res.json({
      unix: stamp.format("X"),
      natural: stamp.format("MMMM D, YYYY")
    })
  } else {
    res.json({
      unix: null,
      natural: null
    })
  }
})
