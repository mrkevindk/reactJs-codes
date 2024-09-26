import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchInput: '',
    passwordsList: [],
    showPasswords: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    if (website && username && password) {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onDeletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        password => password.id !== id,
      ),
    }))
  }

  toggleShowPasswords = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  getFilteredPasswords = () => {
    const {searchInput, passwordsList} = this.state
    return passwordsList.filter(password =>
      password.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {website, username, password, searchInput, showPasswords} = this.state
    const filteredPasswordsList = this.getFilteredPasswords()
    const isPasswordsListEmpty = filteredPasswordsList.length === 0

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-manager-container">
          <div className="first-card">
            <form
              className="password-form-container"
              onSubmit={this.onAddPassword}
            >
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-icon"
                />
                <input
                  type="text"
                  value={website}
                  onChange={this.onChangeWebsite}
                  placeholder="Enter Website"
                  className="input"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-icon"
                />
                <input
                  type="text"
                  value={username}
                  onChange={this.onChangeUsername}
                  placeholder="Enter Username"
                  className="input"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-icon"
                />
                <input
                  type="password"
                  value={password}
                  onChange={this.onChangePassword}
                  placeholder="Enter Password"
                  className="input"
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
            <source
              media="(min-width: 768px)"
              srcSet="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </picture>
        </div>
        <div className="passwords-container">
          <div className="search-container">
            <h1 className="passwords-heading">Your Passwords</h1>
            <p className="passwords-count">{filteredPasswordsList.length}</p>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                placeholder="Search"
                className="search-input"
              />
            </div>
          </div>

          <hr className="separator" />

          <div className="show-passwords-container">
            <input
              type="checkbox"
              id="showPasswords"
              checked={showPasswords}
              onChange={this.toggleShowPasswords}
            />
            <label htmlFor="showPasswords" className="show-passwords-label">
              Show Passwords
            </label>
          </div>

          {isPasswordsListEmpty ? (
            <div className="no-passwords-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-image"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-list">
              {filteredPasswordsList.map(passwordItem => (
                <li key={passwordItem.id} className="password-item">
                  <p className="password-item-detail">{passwordItem.website}</p>
                  <p className="password-item-detail">
                    {passwordItem.username}
                  </p>
                  <p className="password-item-detail">
                    {showPasswords ? (
                      passwordItem.password
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-image"
                      />
                    )}
                  </p>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => this.onDeletePassword(passwordItem.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-icon"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
