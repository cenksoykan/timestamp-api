const express = require('express')
const app = express()
const path = require('path')
const moment = require('moment')

const port = process.env.PORT || 8080

app.listen(port, () => console.log('Example app listening on port ' + port) )

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')) )

app.get('/:query', (req,res) => {
  var stamp
  (/^\d{8,}$/.test(req.params.query)) ? stamp = moment(req.params.query, "X") : stamp = moment(req.params.query, "MMMM D, YYYY")

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
