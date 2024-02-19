import { Button, Stack } from '@suid/material'
import NfdWebsocket from './nfd-websocket'
import PeerJs from './peer-js'
import NdnTestbed from './ndn-testbed'
import { connections as db, Config as Conn } from '../../backend/models/connections'
import { useNavigate } from '@solidjs/router'
import NdnTestbedOidc from './ndn-testbed-oidc'

export default function Connect() {
  const navigate = useNavigate()

  const onAdd = async (config: Conn) => {
    await db.save(config)
    navigate('/connection', { replace: true })
  }

  return (
    <Stack spacing={2}>
      <NdnTestbed onAdd={onAdd} />
      <NdnTestbedOidc onAdd={onAdd} />
      <NfdWebsocket onAdd={onAdd} />
      <PeerJs onAdd={onAdd} />
      <Button
        variant="text"
        color="secondary"
        onClick={() =>
          onAdd({
            kind: 'ble',
          })
        }
      >
        BLE (Imcompatible)
      </Button>
    </Stack>
  )
}
