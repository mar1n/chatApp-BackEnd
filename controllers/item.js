const express = require('express')

// Item Model
const Item = require('../models/item')

exports.item = (req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items))
};