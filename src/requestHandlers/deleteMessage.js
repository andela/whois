export default (req, res) => {
  res.send({
    text: null,
    response_type: 'ephemeral',
    delete_original: true,
  }).end();
};
