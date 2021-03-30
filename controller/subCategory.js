const subCategory = require("../models/subCategory")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const {name, parent} = req.body
        console.log("sub>>>>>>", name)
        res.json(await new subCategory({ name, parent, slug: slugify(name) }).save())
        
    } catch (error) {
        res.status(400).send("Create sub-category failed");
    }

}

exports.list = async (req, res) => {
    res.json( await subCategory.find({}).sort({ createdAt: -1}).exec())
}

exports.read = async (req, res) => {
    let subcategory = await subCategory.findOne({ slug: req.params.slug}).exec()
    res.json(subcategory)
}

exports.update = async (req, res) => {
    const { name, parent } = req.body
    try {
        const updated = await subCategory.findOneAndUpdate(
            { slug: req.params.slug }, 
            { name, parent, slug: slugify(name) },
            { new: true })
        res.send(updated)

    } catch (error) {
        res.status(400).send("sub-category update operation failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await subCategory.findOneAndDelete({slug: req.params.slug})
        console.log("delete>>>>>>", deleted)
        res.json(deleted)
    } catch (error) {
        res.status(400).send("sub-category-deleted operation failed")
    }
}