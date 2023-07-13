const path = require('path')
const simpleGit = require('simple-git')
const BACKEND_PATH = path.join(__dirname, '..')
const FRONTEND_PATH = path.join(__dirname, '..', '..', 'teleopsclient')
const backend = simpleGit(BACKEND_PATH)
const frontend = simpleGit(FRONTEND_PATH)

const versions = { backend: null, frontend: null }
// Backend version is only fetched once

/**
 *
 * @returns {Promise}
 */
function getBackendVersion () {
  return new Promise(resolve => {
    backend.branch().then(backendData => {
      for (const b in backendData.branches) {
        const branch = backendData.branches[b]
        if (branch.current) {
          versions.backend = branch
          break
        }
      }
      resolve(versions.backend)
    })
  })
};

async function getVersion () {
  const frontendData = await frontend.branch()
  for (const b in frontendData.branches) {
    const branch = frontendData.branches[b]
    if (branch.current) {
      versions.frontend = branch
      break
    }
  }
  return versions
}

module.exports = {
  backendVersion: getBackendVersion(),
  versions,
  getVersion
}
