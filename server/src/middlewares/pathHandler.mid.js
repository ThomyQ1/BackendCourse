function pathHandler(req, res ,next) {
    return res.json({
        statusCode: 404,
        response: `${req.method} ${req.url} not found endpoint`
    })
}

export default pathHandler