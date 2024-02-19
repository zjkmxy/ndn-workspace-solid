import { openRoot } from '../../utils'
import { TypedModel } from './typed-models'

export type ConfigBase = {
  kind: string
}

export type NfdWs = ConfigBase & {
  kind: 'nfdWs'
  uri: string
  isLocal: boolean
  prvKeyB64: string
  ownCertificateB64: string
}

export type PeerJs = ConfigBase & {
  kind: 'peerJs'

  /** Server host. */
  host: string

  /** Server port number. */
  port: number

  /** Connection key for server API calls. Defaults to `peerjs`. */
  key?: string

  /** The path where your self-hosted PeerServer is running. Defaults to `'/'`. */
  path?: string

  /** Optional ID of this peer provided by the user. */
  peerId?: string
}

export type Ble = ConfigBase & {
  kind: 'ble'
}

export type Config = NfdWs | PeerJs | Ble

export function getName(conn?: Config): string {
  if (conn === undefined) {
    return ''
  }
  switch (conn.kind) {
    case 'nfdWs':
      return conn.uri
    case 'peerJs':
      return `peerjs://${conn.host}:${conn.port}${conn.path}`
    case 'ble':
      return `ble`
  }
}

export const storageFolder = 'connections'

export const connections = new TypedModel<Config>('connections', getName)

export async function initDefault() {
  const rootHandle = await openRoot()
  try {
    await rootHandle.getDirectoryHandle(storageFolder)
    return
  } catch {
    connections.save({
      kind: 'nfdWs',
      uri: 'ws://localhost:9696/',
      isLocal: true,
      prvKeyB64: '',
      ownCertificateB64: '',
    })
    connections.save({
      kind: 'ble',
    })
  }
}

export const save = connections.save.bind(connections)
export const remove = connections.remove.bind(connections)
export const isExisting = connections.isExisting.bind(connections)
export const loadAll = connections.loadAll.bind(connections)
