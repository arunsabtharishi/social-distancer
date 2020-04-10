const pingapi = `https://ec2-3-15-197-118.us-east-2.compute.amazonaws.com:8080/update-device-location`



export function pingDeviceLocation (obj) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return fetch(pingapi, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(obj)
  })
}

