import { DID } from 'dids'
import { Integration } from 'lit-ceramic-sdk'

declare global {
  interface Window {
    did?: DID
  }
}

let litCeramicIntegration = new Integration()

let streamID = 'kjzl6cwe1jw1479rnblkk5u43ivxkuo29i4efdx1e7hk94qrhjl0d4u0dyys1au' // test data

const updateAlert = (status: string, message: string) => {
  const alert = document.getElementById('alerts')

  if (alert !== null) {
    alert.textContent = message
    alert.classList.add(`alert-${status}`)
    alert.classList.remove('hide')
    setTimeout(() => {
      alert.classList.add('hide')
    }, 5000)
  }
}
const updateStreamID = (resp: String) => {
  streamID = resp
  console.log('you now have this as your streamID', streamID)
  // @ts-ignore
  document.getElementById('stream').innerText = resp
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContent.........')
  litCeramicIntegration.startLitClient(window)
})

document.getElementById('readCeramic')?.addEventListener('click', () => {
  if (document.getElementById('stream') === null) {
    updateAlert('danger', `Error, please write to ceramic first so a stream can be read`)
  } else {
    // @ts-ignore
    console.log('this is the streamID youre sending: ', streamID)
    const response = litCeramicIntegration.readAndDecrypt(streamID).then(
      (value) =>
        // @ts-ignore
        (document.getElementById('decryption').innerText = value)
    )
    console.log(response)
  }
})

// encrypt with Lit and write to ceramic

document.getElementById('encryptLit')?.addEventListener('click', function () {
  // @ts-ignore
  const stringToEncrypt = document.getElementById('secret').value
  // User must posess at least 0.000001 ETH on eth
  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: 'eth_getBalance',
      parameters: [':userAddress', 'latest'],
      returnValueTest: {
        comparator: '>=',
        value: '1000000000000',
      },
    },
  ]
  const response = litCeramicIntegration
    .encryptAndWrite(stringToEncrypt, accessControlConditions)
    .then((value) => updateStreamID(value))
  console.log(response)
})
