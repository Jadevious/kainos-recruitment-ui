var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const jobdata = require("../../../data/jobdata.js");
const URL = "http://localhost:8080/api/job-roles"
const capabilitiesURL = "http://localhost:8080/api/capabilities"

const jobRoles = {
  id: 1,
  name: "Software Engineer",
  description: "Builds the software from requirements set by clients",
  capability: "Engineering",
  specification: "example.org",
  job_responsibilities: "Build and test software",
  band_id: 1,
  job_familyID: 1
}

const capabilities = [
  {id:1, name: "Apprentice"}, {id: 2, name: "Trainee"}, {id:3, name: "Consultant"}
]

var id = 1;

const failedRolesError = 'Failed to get roles';
const failedRoleByIdError = 'Failed to get the role';
const failedFindRolesError = 'Could not find roles'
const failedFindRoleByIdError = 'Could not find the role'
const failedToReachAPIError = 'Unable to reach API'
const allOtherErrors = 'Error contacting API, please contact site Admin'

const failedCapabilitiesError = 'Failed to get capabilties';
const failedFindCapabilitiesError = 'Could not find capabilities'

describe('getJobRoles', function () {
  it('should return jobs from response', async () => {
    var mock = new MockAdapter(axios);
    const data = [jobRoles];
    mock.onGet(URL).reply(200, data);
    var results = await jobdata.getJobRoles();
    expect(results[0]).to.deep.equal(jobRoles)
  })

  it('should throw exception when 500 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(URL).reply(500);
    var error = await jobdata.getJobRoles()
    expect(error.message).to.equal(failedRolesError)
  })

  it('should throw exception when 400 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(URL).reply(400);
    var error = await jobdata.getJobRoles()
    expect(error.message).to.equal(failedFindRolesError)
  })

  it('should throw exception when axios has no response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(URL).timeout();
    var error = await jobdata.getJobRoles()
    expect(error.message).to.equal(failedToReachAPIError)
  })
})

describe('getCapabilities', function () {
  it('should return capabilities from response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(capabilitiesURL).reply(200, capabilities);
    var results = await jobdata.getCapabilities();
    expect(results).to.deep.equal(capabilities)
  })

  it('should throw exception when 500 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(capabilitiesURL).reply(500);
    var error = await jobdata.getCapabilities()
    expect(error.message).to.equal(failedCapabilitiesError)
  })

  it('should throw exception when 400 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(capabilitiesURL).reply(400);
    var error = await jobdata.getCapabilities()
    expect(error.message).to.equal(failedFindCapabilitiesError)
  })

  it('should throw exception when axios has no response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(capabilitiesURL).timeout();
    var error = await jobdata.getCapabilities()
    expect(error.message).to.equal(failedToReachAPIError)
  })
})

describe('getJobRoleById', function () {
  var id = 1;
  var param = {id: 1}
  it('should return a job with the response id given', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(URL + "/" + id).reply(200, jobRoles);
    var results = await jobdata.getJobRoleById(param);
    expect(results).to.deep.equal(jobRoles)
  })

  it('should throw exception when 500 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(URL + "/1").reply(500);
    var error = await jobdata.getJobRoleById({id: 1})
    expect(error.message).to.equal(failedRoleByIdError)
  })

  it('should throw exception when 400 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(URL + "/1").reply(400);
    var error = await jobdata.getJobRoleById({id: 1})
    expect(error.message).to.equal(failedFindRoleByIdError)
  })

  it('should throw exception when axios has no response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(URL + "/1").timeout();
    var error = await jobdata.getJobRoleById()
    expect(error.message).to.equal(failedToReachAPIError)
  })
})

