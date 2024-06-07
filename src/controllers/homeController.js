class homeController {
    index(req, res) {
        res.status(200).json({status: true});
    }
}

export default new homeController();