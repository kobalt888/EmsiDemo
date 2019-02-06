import axios from 'axios';
// eslint-disable-next-line
export async function getJobData(jobTitle) {
  /*
    Performs GET requests on various endpoints in an attempt to return something useful
     */
  if (jobTitle === 'Computer Programmer') {
    return axios
      .get('http://www.mocky.io/v2/5a29b5672e00004a3ca09d33?mocky-delay=500ms')
      .then(response => response.data)
      .catch(error => error.toString());
  } else if (jobTitle === 'Bed Tester') {
    return axios
      .get('http://www.mocky.io/v2/5c5b3ed23900001300e05687?mocky-delay=500ms')
      .then(response => response.data)
      .catch(error => error.toString());
  }
}
