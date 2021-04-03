function validateUserForm(req, res, next) {
    if (!(req.body.password && req.body.email && req.body.fullname))
        res.status(400).json({
            'error': 'form is not valid'
        });
    else {
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexEmail.test(req.body.email)) {
            res.status(400).json({
                'error': 'form is not valid'
            });
        } else {
            return next();
        }
    }
}
function validateLoginForm(req, res, next) {
    if (!(req.body.password && req.body.email))
        res.status(400).json({
            'error': 'form is not valid'
        });
    else {
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexEmail.test(req.body.email)) {
            res.status(400).json({
                'error': 'form is not valid'
            });
        } else {
            return next();
        }
    }
}
function validateQuestionForm(req, res, next) {
    var flag = 1;

    if (!(req.body.text && req.body.email && req.body.type)) {
        flag = 0;
    }else {
        if ((typeof req.body.type).localeCompare("number")) {
            flag = 0;
        } else {
            if (!(req.body.type == 1 || req.body.type == 2)) {
                flag = 0;
            }
        }
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexEmail.test(req.body.email)) {
            flag = 0;
        }
    }
    if (flag) {
        next();
    } else {
        res.status(400).json({
            'error': 'form is not valid'
        });
    }
}

module.exports = {
    validateUserForm,
    validateQuestionForm,
    validateLoginForm
}