const pingapi = `https://ec2-18-191-180-167.us-east-2.compute.amazonaws.com:8080/update-device-location`



export function pingDeviceLocation (obj) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return fetch(pingapi, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(obj)
  })
}

