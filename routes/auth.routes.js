const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();


// /api/auth/register
router.post(
	'/register',
	[
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Минимальная длина пароля 6 символов')
		.isLength({ min: 6 })
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
			message: 'Некорректныe данные при регистрации'
		})
		}

		const {username, password, email} = req.body

		const candidate = await User.findOne({email})
		if (candidate) {
		return res.status(400).json({ message: 'Такой пользователь уже существует' })
		}
		const hashedPassword = await bcrypt.hash(password[0], 12)
		console.log(username)
		const user = new User({ username: username[0], email: email[0], password: hashedPassword })

		await user.save()

		res.status(201).json({ message: 'Пользователь создан' })

	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
	}
})

// /api/auth/login
router.post(
	'/login',
	[
		check('username', 'Не правильное имя').exists(),
		check('password', 'Введите пароль').exists()
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
			message: 'Некорректныe данные при входе в систему'
		})
		}

		const {username , password} = req.body

		const user = await User.findOne({ username })

		if (!user) {
		return res.status(400).json({ message: 'Пользователь не найден' })
		}

		const isMatch = await bcrypt.compare(password[0], user.password)

		if (!isMatch) {
		return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
		}

		const token = jwt.sign(
			{ userId: user.id },
			config.get('jwtSecret'),
			{ expiresIn: '1h' }
		)

		res.json({ token, userId: user.id })

	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
		console.log(e)
	}
})


module.exports = router