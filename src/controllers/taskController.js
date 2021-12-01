const Link = require('../models/User');

const redirect = async(req, res, next) => {
    let title = req.params.title;

    try {
        let doc = await Link.findOneAndUpdate({ title }, { $inc: { click: 1 } });
        //db.links.update({title: 'title'},{$inc:{click: 1}})
        if (doc) {
            res.redirect(doc.url);
        } else {
            next();
        }
    } catch (error) {
        res.send('houve um erro no redirecionamento', error);
    }
}

const addLink = async(req, res) => {
    let link = new Link(req.body)
    try {
        let doc = await link.save();
        //db.links.insertOne({title:'title', description:'description',url:'url'})
        res.redirect('/');
    } catch (error) {
        res.send('houve um erro na adição do link')
    }
}

const allLinks = async(req, res) => {
    try {
        let docs = await Link.find({});
        //db.links.find({})
        res.render('all', { links: docs });
    } catch (error) {
        res.send('houve um erro em allLinks', error)
    }
}

const deleteLink = async(req, res) => {

    let id = req.params.id;

    if (!id) {
        id = req.body.id;
    }
    try {
        await Link.findByIdAndDelete(id);
        //db.links.remove({_id: ObjectId("id")})
        res.redirect('/')
    } catch (error) {
        res.send('houve um erro ao deletar um link', error)
    }
}

const loadLink = async(req, res) => {

    let id = req.params.id;

    try {
        let doc = await Link.findById(id);
        //db.links.find({_id: ObjectId("id")})
        res.render('edit', { error: false, body: doc })
    } catch (error) {
        res.status(404).send(error);
    }
}
const editLink = async(req, res) => {
    let link = {};
    link.title = req.body.title;
    link.description = req.body.description;
    link.url = req.body.url;

    let id = req.params.id;

    if (!id) {
        id = req.body.id;
    }

    try {
        let doc = await Link.findByIdAndUpdate(id, link);
        //db.links.update({_id:ObjectId('id')},{$set:{title:'title', description:'description',url:'url'}})
        res.redirect('/');
    } catch (error) {
        res.render('edit', { error, body: req.body })
    }
}
module.exports = { redirect, addLink, allLinks, deleteLink, loadLink, editLink };