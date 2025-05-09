import { Alert } from '../core/Alert'
import { Heading } from '../core/Heading'
import { Paragraph } from '../core/Paragraph'
import { Option, Select } from '../core/Select'
import { Switch } from '../core/Switch'
import { Text } from '../core/Text'
import { Separator } from '../core/Separator'
import { Link } from '../core/Link'
import {
  Information16,
  LogoDiscord16,
  Globe16,
  LogoGithub16,
} from '@siafoundation/react-icons'
import { ThemeRadio } from '../components/ThemeRadio'
import { webLinks } from '../data/webLinks'
import { useAppSettings } from '@siafoundation/react-core'
import { Dialog } from '../core/Dialog'
import { CurrencyFiatSelector } from './CurrencyFiatSelector'
import { CurrencyDisplaySelector } from './CurrencyDisplaySelector'
import { ValueCopyable } from '../components/ValueCopyable'
import { minutesInMilliseconds } from '@siafoundation/units'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  securityEl?: React.ReactNode
  showGpuSetting?: boolean
}

export function SettingsDialog({
  open,
  onOpenChange,
  securityEl,
  showGpuSetting,
}: Props) {
  const {
    settings,
    setRequestSettings,
    setExternalDataSettings,
    daemonExplorer,
    gpu,
  } = useAppSettings()

  return (
    <Dialog
      open={open}
      title="App preferences"
      onOpenChange={onOpenChange}
      contentVariants={{ className: 'w-[450px]' }}
    >
      <div className="flex flex-col gap-6 mb-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Text size="16" weight="bold">
              Display
            </Text>
            <Paragraph size="14">
              Configure visual and locale display preferences.
            </Paragraph>
            <Alert>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Text>
                    <Information16 />
                  </Text>
                  <Heading size="20" className="flex-1">
                    Currency display
                  </Heading>
                  <CurrencyDisplaySelector />
                </div>
                <Paragraph size="14">
                  Select whether you would like to see currency values in
                  siacoin, fiat, or both. Fiat requires a third-party API
                  enabled under Privacy.
                </Paragraph>
              </div>
            </Alert>
            <Alert>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Text>
                    <Information16 />
                  </Text>
                  <Heading size="20" className="flex-1">
                    Fiat
                  </Heading>
                  <CurrencyFiatSelector />
                </div>
                <Paragraph size="14">
                  Select a fiat currency for price conversions from Siacoin.
                  Requires a third-party API enabled under Privacy.
                </Paragraph>
              </div>
            </Alert>
            <Alert>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Text>
                    <Information16 />
                  </Text>
                  <Heading size="20" className="flex-1">
                    Theme
                  </Heading>
                  <ThemeRadio />
                </div>
                <Paragraph size="14">
                  {`Switch between a dark or light mode, or follow your system's settings.`}
                </Paragraph>
              </div>
            </Alert>
            {showGpuSetting && (
              <Alert>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <Text>
                      <Information16 />
                    </Text>
                    <Heading size="20" className="flex-1">
                      GPU
                    </Heading>
                    <Switch
                      disabled={!gpu.canGpuRender}
                      checked={gpu.canGpuRender && gpu.isGpuEnabled}
                      onCheckedChange={gpu.setIsGpuEnabled}
                      size="medium"
                    />
                  </div>
                  <Paragraph size="14">
                    Enable features that require a GPU.{' '}
                    {gpu.canGpuRender
                      ? ''
                      : 'This device does not support GPU rendering.'}
                  </Paragraph>
                </div>
              </Alert>
            )}
          </div>
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col gap-2">
          <Text size="16" weight="bold">
            Security
          </Text>
          <div className="flex flex-col gap-4">
            <Paragraph size="14">Configure security preferences.</Paragraph>
            <Alert>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Text>
                    <Information16 />
                  </Text>
                  <Heading size="20" className="flex-1">
                    Lock app
                  </Heading>
                  <Switch
                    size="medium"
                    checked={settings.autoLock}
                    onCheckedChange={(val) =>
                      setRequestSettings({ autoLock: val })
                    }
                  />
                  <Select
                    disabled={!settings.autoLock}
                    value={String(settings.autoLockTimeout)}
                    onChange={(e) => {
                      setRequestSettings({
                        autoLockTimeout: Number(e.currentTarget.value),
                      })
                    }}
                  >
                    <Option value={minutesInMilliseconds(5)}>5 minutes</Option>
                    <Option value={minutesInMilliseconds(10)}>
                      10 minutes
                    </Option>
                    <Option value={minutesInMilliseconds(20)}>
                      20 minutes
                    </Option>
                    <Option value={minutesInMilliseconds(30)}>
                      30 minutes
                    </Option>
                    <Option value={minutesInMilliseconds(60)}>1 hour</Option>
                  </Select>
                </div>
                <Paragraph size="14">
                  {`Automatically lock the app after a certain period of inactivity.`}
                </Paragraph>
              </div>
            </Alert>
            {securityEl}
          </div>
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col gap-2">
          <Text size="16" weight="bold">
            Privacy
          </Text>
          <div className="flex flex-col gap-4">
            <Paragraph size="14">
              Configure privacy preferences. The app uses the third-party APIs
              listed below to improve the user experience. Third-party APIs are
              optional and can be toggled on or off.
            </Paragraph>
            {daemonExplorer.isSupported ? (
              <Alert>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-1 items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <Text>
                        <Information16 />
                      </Text>
                      <Heading size="20" className="flex-1">
                        Explorer
                      </Heading>
                    </div>
                    <div className="flex gap-2 items-center">
                      {daemonExplorer.api ? (
                        <ValueCopyable
                          maxLength={30}
                          value={daemonExplorer.api}
                        />
                      ) : (
                        <Text size="14" weight="medium" color="subtle">
                          Not configured
                        </Text>
                      )}
                      <Switch
                        size="medium"
                        disabled
                        checked={daemonExplorer.enabled}
                        onCheckedChange={(val) =>
                          setExternalDataSettings({ siascan: val })
                        }
                      />
                    </div>
                  </div>
                  <Paragraph size="14">
                    The app fetches average prices, exchange rates, and host
                    geolocation from the configured explorer API. This API is
                    configured and enabled in the daemon's startup
                    configuration.
                  </Paragraph>
                </div>
              </Alert>
            ) : (
              <Alert>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <Text>
                      <Information16 />
                    </Text>
                    <Heading size="20" className="flex-1">
                      Siascan
                    </Heading>
                    <Switch
                      size="medium"
                      checked={settings.siascan}
                      onCheckedChange={(val) =>
                        setExternalDataSettings({ siascan: val })
                      }
                    />
                  </div>
                  <Paragraph size="14">
                    The app fetches average prices, exchange rates, and host
                    geolocation from the Siascan API.
                  </Paragraph>
                </div>
              </Alert>
            )}
          </div>
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col gap-2">
          <Text size="16" weight="bold">
            Help
          </Text>
          <div className="flex flex-col gap-4">
            <Paragraph size="14">
              Find information about the Sia software at our website,
              documentation site, and on Github. Join our active Discord
              community for discussion and help troubleshooting issues.
            </Paragraph>
            <div className="flex gap-4">
              <Link
                href={webLinks.website.index}
                target="_blank"
                className="flex items-center gap-1"
              >
                <Globe16 />
                Website
              </Link>
              <Link
                href={webLinks.docs.index}
                target="_blank"
                className="flex items-center gap-1"
              >
                <Information16 />
                Docs
              </Link>
              <Link
                href={webLinks.github.index}
                target="_blank"
                className="flex items-center gap-1"
              >
                <LogoGithub16 />
                About
              </Link>
              <Link
                href={webLinks.discord}
                target="_blank"
                className="flex items-center gap-1"
              >
                <LogoDiscord16 />
                Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
