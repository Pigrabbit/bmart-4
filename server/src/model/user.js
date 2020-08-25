class User {
  constructor(db, { id, username, firstname, lastname, email, google_id }) {
    this.db = db
    this.id = id
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.google_id = google_id
  }

  async findById() {
    const conn = await this.db.getConnection()
    try {
      const query = 'SELECT * FROM user where id=?'
      const [rows] = await conn.query(query, [this.id])

      return rows[0]
    } catch (error) {
      throw error
    } finally {
      conn.release()
    }
  }

  async findByGoogleId() {
    const conn = await this.db.getConnection()
    try {
      const query = 'SELECT * FROM user where google_id=?'
      const [rows] = await conn.query(query, [this.google_id])

      return rows[0]
    } catch (error) {
      throw error
    } finally {
      conn.release()
    }
  }

  async create() {
    const conn = await this.db.getConnection()
    try {
      const query = 'INSERT INTO user (firstname, lastname, email, google_id) VALUES (?, ? ,?, ?)'
      await conn.query(query, [this.firstname, this.lastname, this.email, this.google_id])
    } catch (error) {
      throw error
    } finally {
      conn.release()
    }
  }
}

module.exports = User
