import { DID } from 'dids'
import { Integration } from 'lit-ceramic-sdk'

declare global {
  interface Window {
    did?: DID
  }
}

let litCeramicIntegration = new Integration('https://ceramic-clay.3boxlabs.com', 'polygon')

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
const updateStreamID = (resp: string | String) => {
  streamID = resp as string
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
  console.log('chain in litCeramicIntegration: ', litCeramicIntegration.chain)
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

  // const evmContractConditions = [
  //   {
  //     contractAddress: '0xb71a679cfff330591d556c4b9f21c7739ca9590c',
  //     functionName: 'members',
  //     functionParams: [':userAddress'],
  //     functionAbi: {
  //       constant: true,
  //       inputs: [
  //         {
  //           name: '',
  //           type: 'address',
  //         },
  //       ],
  //       name: 'members',
  //       outputs: [
  //         {
  //           name: 'delegateKey',
  //           type: 'address',
  //         },
  //         {
  //           name: 'shares',
  //           type: 'uint256',
  //         },
  //         {
  //           name: 'loot',
  //           type: 'uint256',
  //         },
  //         {
  //           name: 'exists',
  //           type: 'bool',
  //         },
  //         {
  //           name: 'highestIndexYesVote',
  //           type: 'uint256',
  //         },
  //         {
  //           name: 'jailed',
  //           type: 'uint256',
  //         },
  //       ],
  //       payable: false,
  //       stateMutability: 'view',
  //       type: 'function',
  //     },
  //     chain: 'xdai',
  //     returnValueTest: {
  //       key: 'shares',
  //       comparator: '>=',
  //       value: '1',
  //     },
  //   },
  // ]

  // const response = litCeramicIntegration
  //   .encryptAndWrite(stringToEncrypt, evmContractConditions, 'evmContractConditions')
  //   .then((value) => updateStreamID(value))
  // console.log(response)
})
