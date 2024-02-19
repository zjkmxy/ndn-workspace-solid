import { Button, Paper, Typography } from '@suid/material'
import { useNdnWorkspace, initTestbed } from './Context'
import { useNavigate } from '@solidjs/router'

function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

function App() {
  const { currentConnConfig } = useNdnWorkspace()!
  const navigate = useNavigate()

  initTestbed()

  const configToDescription = () => {
    const config = currentConnConfig()
    if (!config) {
      return <div>Finding closest NDN forwarder</div>
    } else if (config.kind === 'peerJs') {
      return (
        <div>
          <div>Connected to PeerJS</div>
          <div style={{ 'font-weight': 300 }}>{config.host}</div>
        </div>
      )
    } else if (config.kind === 'nfdWs') {
      return (
        <div>
          <div>Connected to NDN forwarder</div>
          <div style={{ 'font-weight': 300 }}>{config.uri}</div>
        </div>
      )
    } else if (config.kind === 'ble') {
      return (
        <div>
          <div>Connected to BLE YaNFD</div>
        </div>
      )
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        px: 3,
        py: 2,
        mx: 'auto',
        minWidth: '100%',
        maxWidth: '560px',
        textAlign: 'left',
      }}
    >
      <Typography variant="h3" sx={{ mt: 5, my: 3, fontWeight: 100 }}>
        Workspace
      </Typography>

      <>
        <Typography variant="h5" sx={{ m: 0, my: 2, fontWeight: 100 }}>
          Collaborative LaTeX editor for the decentralized Internet
        </Typography>

        <Typography variant="body1" sx={{ my: 2 }}>
          Workspace is a decentralized LaTeX and document editor that allows you to collaborate with others without
          depending on a third-party service. It is built with Named Data Networking and runs over the global NDN
          testbed infrastructure, operated in collaboration by universities and research institutions around the world.
        </Typography>

        <Typography variant="body1" sx={{ my: 3 }}>
          <Button
            onClick={() => navigate('/profile', { replace: true })}
            variant="contained"
            color="primary"
            size="large"
          >
            Create or Join a Workspace
          </Button>
        </Typography>
      </>

      <>
        <hr />
        <Typography variant="body1" sx={{ m: 3, fontSize: '1.1em' }}>
          {configToDescription()}

          {isSafari() && (
            <div>
              <hr /> Safari is currently not well-supported. Please prefer using Chrome, Firefox, or Edge.
            </div>
          )}
        </Typography>
        <hr />
      </>

      <>
        <Typography variant="h4" sx={{ mt: 8, mb: 2, fontWeight: 100 }}>
          Quick Overview
        </Typography>

        <Typography variant="body1" sx={{ my: 2 }}>
          Workspace is a fully decentralized Latex editor where <i>you control your data</i>. When you use workspace,
          all your data is only stored in your own browser and the browsers of your collaborators.
          <ul>
            <li>Fully decentralized, no third-party service involved</li>
            <li>No download required, Workspace runs completely in the browser</li>
            <li>Live collaborative editing of documents with multiple users</li>
            <li>In-browser Latex compilation and preview</li>
          </ul>
          To enable collaboration in a decentralized manner, Workspace uses the Named Data Networking (NDN) protocols.
          All collaborators in a workspace are connected to each other using the global NDN testbed or local NDN
          infrastructure. Workspace then uses the State Vector Sync protocol to keep all collaborators in sync.
        </Typography>

        <Button
          href="https://irl.cs.ucla.edu/data/files/submissions/Workspace.pdf"
          variant="contained"
          color="primary"
          sx={{ mr: 1, mb: 1 }}
        >
          Workspace Paper
        </Button>

        <Button
          href="https://irl.cs.ucla.edu/data/files/submissions/WWW_2024_Microverse_Short_Paper.pdf"
          variant="contained"
          color="primary"
          sx={{ mr: 1, mb: 1 }}
        >
          Secure Web Objects
        </Button>

        <Button href="https://named-data.net/" variant="contained" color="primary" sx={{ mr: 1, mb: 1 }}>
          Learn More about NDN
        </Button>
      </>

      <>
        <Typography variant="h4" sx={{ mt: 8, mb: 2, fontWeight: 100 }}>
          Getting Started
        </Typography>

        <Typography variant="body1" sx={{ my: 2 }}>
          To start using Workspace, you need to create or join a workspace. Each workspace is a decentralized virtual
          folder where you can collaborate with others.
          <>
            <Typography variant="h5" sx={{ mb: 1, mt: 3, fontWeight: 100 }}>
              Connecting to the NDN Testbed
            </Typography>
            The NDN testbed provides the packet forwarding infrastructure for Workspace. You can connect to the testbed
            by obtaining a testbed certificate using your email address.
            <ol>
              <li>Open the connection tab in Workspace</li>
              <li>Click on "Add" button</li>
              <li>Click the "Reach Testbed" button to find the closest NDN node</li>
              <li>Enter your email address and click on "Request" to receive a verification code</li>
              <li>Email verification code and click "Get Cert" to obtain a testbed certificate</li>
            </ol>
            You can now connect to the testbed node using the connections page. Opening Workspace will also
            automatically connect to the closest testbed node by default.
          </>
          <>
            <Typography variant="h5" sx={{ mb: 1, mt: 3, fontWeight: 100 }}>
              Join a Workspace
            </Typography>
            To join an existing Workspace, perform the following steps after ensuring you are connected to the NDN
            testbed.
            <ol>
              <li>Open the "Workspace" tab</li>
              <li>Click on the "Convert" button</li>
              <li>Enter the full trust anchor name of the workspace</li>
              <li>Click on the "Join" button</li>
            </ol>
            You can now join the workspace any time from the "Workspace" tab, and start collaborating on documents in
            the "Editor" tab.
          </>
          <>
            <Typography variant="h5" sx={{ mb: 1, mt: 3, fontWeight: 100 }}>
              Create a Workspace
            </Typography>
            To create a new Workspace, you need to generate a trust anchor that identifies the Workspace and the user
            certificates.
            <ol>
              <li>
                Install the ndn-cxx library (see instructions
                <a href="https://docs.named-data.net/ndn-cxx/current/INSTALL.html">here</a>)
              </li>
              <li>
                Pick a workspace name you would like to have, say <code>/my-workspace</code>
              </li>
              <li>
                Generate a self-signed certificate for the workspace
                <code style={{ 'padding-left': '15px', display: 'block' }}>ndnsec key-gen /my-workspace</code>
                This self-signed certificate will be the trust anchor for this workspace. All user certificates must be
                signed by this one. Now with the trust anchor in your hands, you can start signing user certificates for
                your users. Note that yourself also need a user certificate signed by trust anchor.
              </li>

              <li>
                For example, generate a key and certificate for <code>/my-workspace/alice</code>
                <br />
                <code style={{ 'padding-left': '15px', display: 'block' }}>
                  ndnsec key-gen /my-workspace/alice <br />
                  ndnsec sign-req /my-workspace/alice | ndnsec cert-gen -s <br />
                  /my-workspace -i my-workspace | ndnsec cert-install -
                </code>
              </li>
              <li>
                Some notes for naming conventions:
                <ul>
                  <li>
                    You should not name users by random strings, but rather you will have some rules in mind to name
                    users, and that is naming convention.
                  </li>
                  <li>Current workspace requires every user to be named under your workspace prefix.</li>
                  <li>
                    You should ensure every user uses a different name. If two users are using the same name, undefined
                    behaviors may happen.
                  </li>
                </ul>
              </li>

              <li>
                Open the app, goto the workspace tab, click add profile (icon in the top right corner), the app will ask
                you to configure trust anchor and safebag, which is the combination of certificate and encrypted private
                key.
                <div style={{ 'padding-left': '15px' }}>
                  Display trust anchor: <code>ndnsec cert-dump -i /my-workspace</code> <br />
                  Generate safebag: <code>ndnsec export -i /my-workspace/alice</code>
                </div>
                <small>
                  The terminal will ask you for a passphrase for encrypting your private key. Make sure you input the
                  same passphrase when configuring your safebag in the app.
                </small>
              </li>

              <li>Click on the "Join" button to create the workspace.</li>
            </ol>
          </>
        </Typography>
      </>

      <>
        <Typography variant="h4" sx={{ mt: 8, mb: 2, fontWeight: 100 }}>
          Contribute
        </Typography>

        <Typography variant="body1" sx={{ my: 2 }}>
          Like most of the NDN software, Workspace is open-source and free to use. You can contribute to the project by
          reporting bugs, suggesting features, or submitting pull requests. The source code is available on GitHub under
          the UCLA-IRL organization.
          <br />
          <br />
          <b>If you have any questions or need help, feel free to file an issue on the GitHub repository.</b>
        </Typography>
      </>

      <Typography variant="body1" sx={{ my: 3 }}>
        <Button
          href="https://github.com/UCLA-IRL/ndn-workspace-solid"
          variant="contained"
          color="primary"
          sx={{ mr: 1, mb: 1 }}
        >
          GitHub Repository
        </Button>

        <Button
          href="https://github.com/UCLA-IRL/ndn-workspace-solid/wiki"
          variant="contained"
          color="primary"
          sx={{ mr: 1, mb: 1 }}
        >
          Project Wiki
        </Button>
      </Typography>
    </Paper>
  )
}

export default App
