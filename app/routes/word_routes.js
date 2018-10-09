var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

//get word by id
  app.get('/words/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('words').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

//get all words
  app.get('/words/', (req, res) => {
    db.collection('words').find({}).toArray(function(err,allWords) {
      if(err){
        res.status(500).json({ message: err });
      }
      res.status(200).json(allWords);
    });
  });

//get words by assonantRhyme
  app.get('/words/assonantRhyme/:assonantRhyme', (req,res) => {
    const assonantRhyme = req.params.assonantRhyme;
    db.collection('words').find({'assonantRhyme':assonantRhyme}).toArray(function(err, filteredWords) {
      if(err){
        res.status(500).json({ message: err });
      }
      res.status(200).json(filteredWords);
    });
  })

//get words by consonantRhyme
  app.get('/words/consonantRhyme/:consonantRhyme', (req,res) => {
    const consonantRhyme = req.params.consonantRhyme;
    db.collection('words').find({'consonantRhyme':consonantRhyme}).toArray(function(err, filteredWords) {
      if(err){
        res.status(500).json({ message: err });
      }
      res.status(200).json(filteredWords);
    });
  })

//get words by vocal skeleton
  app.get('/words/vocalSkeleton/:vocalSkeleton', (req,res) => {
    const vocalSkeleton = req.params.vocalSkeleton;
    db.collection('words').find({'vocalSkeleton':vocalSkeleton}).toArray(function(err, filteredWords) {
      if(err){
        res.status(500).json({ message: err });
      }
      res.status(200).json(filteredWords);
    });
  })


//post word
  app.post('/words/', (req, res) => {
    const word = {
      chain:req.body.chain,
      assonantRhyme:req.body.assonantRhyme,
      consonantRhyme:req.body.consonantRhyme,
      firstSyllable:req.body.firstSyllable,
      lastSyllable:req.body.lastSyllable,
      vocalSkeleton:req.body.vocalSkeleton
    };
    db.collection('words').insert(word,(err,result)=> {
      if(err){
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

//delete word by id
  app.delete('/words/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('words').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Word ' + id + ' deleted!');
      }
    });
  });

//update word by id
  app.put('/words/:id', (req, res) => {
     const id = req.params.id;
     const details = { '_id': new ObjectID(id) };
     const word = {
       chain: req.body.chain,
       assonantRhyme: req.body.assonantRhyme,
       consonantRhyme:req.body.consonantRhyme,
       firstSyllable:req.body.firstSyllable,
       lastSyllable:req.body.lastSyllable,
       vocalSkeleton:req.body.vocalSkeleton
     };
     db.collection('words').update(details, word, (err, result) => {
       if (err) {
           res.send({'error':'An error has occurred'});
       } else {
           res.send(word);
       }
     });
   });

};
