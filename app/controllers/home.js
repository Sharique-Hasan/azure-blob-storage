var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
var azure = require('azure-storage');
var fs = require('fs');
var container = 'sharique';
var host = 'https://testfileuploader.blob.core.windows.net/';
var key = '5Z1TV80IHD4u2Pn6ECP7tL09fSN2P6lYSYifLg2g7AhDiL8aBHyCKUDJSov9AwAtEGQtLyv4RkUCAD21zBKWlg==';

var blobSvc = azure.createBlobService('testfileuploader', key, host);
blobSvc.createContainerIfNotExists(container, {publicAccessLevel : 'blob'}, function(error, result, response){
  if(!error){
    // Container exists and allows
    // anonymous read access to blob
    // content and metadata within this container
    console.log('container callback');
  }
});
module.exports = function (app) {
  app.use('/', router);
  app.use('/upload', router);
};

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
  res.render('index', {
    title: 'Generator-Express MVC',
    articles: articles
  });
});

router.post('/upload', upload.single('file'), function(req, res) {

  var name = (req.file.filename + req.file.originalname);
  blobSvc.createBlockBlobFromLocalFile(container, name, req.file.path, function(error, result, response){
    if(!error){
      fs.unlinkSync(req.file.path);
      res.status(200).send(blobSvc.getUrl(container, name, null, host));
    }
  });

});
