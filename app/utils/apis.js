const pingapi = `https://ec2-3-93-232-210.compute-1.amazonaws.com:8071/update-device-location`



export function pingDeviceLocation (obj) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return fetch(pingapi, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(obj)
  })
}

