module.exports = {
    UserLogin: function(req, res, next){
        return res.render('../views/admin/user')
    },
    AdminLogin: function(req, res, next){
        return res.render('../views/admin/login')
    },
    AdminInfo: function(req, res, next){
        return res.render('../views/admin/admin')
    },
}