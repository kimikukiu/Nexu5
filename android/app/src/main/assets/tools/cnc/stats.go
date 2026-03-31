package main

func (x *Database) retrieveTotalUsers() int {
	var totalUserCount int
	x.db.QueryRow("select count(*) from users").Scan(&totalUserCount)
	return totalUserCount
}

func (x *Database) retrieveTotalAttacks() int {
	var totalAttackCount int
	x.db.QueryRow("select count(*) from history").Scan(&totalAttackCount)
	return totalAttackCount
}

func (x *Database) retrieveTotalFailedLogins() int {
	var totalFailedLoginCount int
	x.db.QueryRow("select count(action) from logins where action='Fail'").Scan(&totalFailedLoginCount)
	return totalFailedLoginCount
}

func (x *Database) retrieveTotalSuccessfulLogins() int {
	var totalSuccessfulLoginCount int
	x.db.QueryRow("select count(action) from logins where action='Login'").Scan(&totalSuccessfulLoginCount)
	return totalSuccessfulLoginCount
}