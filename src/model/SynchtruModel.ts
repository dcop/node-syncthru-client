interface Toner extends Drum {
  cnt: number
}

interface Drum {
  opt: number,
  remaining: number,
  newError: string
}

interface Tray {
  opt: number,
  paper_size1: number,
  paper_size2: number,
  paper_type1: number,
  paper_type2: number,
  capa: number,
  newError: string
}

interface Capability {
  opt: number,
  capa: number
}

interface Capabilities {
  hdd: Capability,
  ram: Capability,
  scanner: Capability
}

interface Identity {
  model_name: string,
  host_name: string,
  location: string,
  serial_num: string,
  ip_addr: string,
  ipv6_link_addr: string,
  mac_addr: string,
  admin_email: string,
  admin_name: string,
  admin_phone: string,
  customer_support: string
}

interface Status {
  hrDeviceStatus: number,
  status1: string,
  status2: string,
  status3: string,
  status4: string
}

interface GxiInformation {
  GXI_ACTIVE_ALERT_TOTAL: number,
  GXI_ADMIN_WUI_HAS_DEFAULT_PASS: number,
  GXI_SUPPORT_COLOR: number,
  GXI_SYS_LUI_SUPPORT: number,
  GXI_A3_SUPPORT: number,
  GXI_TRAY2_MANDATORY_SUPPORT: number,
  GXI_SWS_ADMIN_USE_AAA: number,
  GXI_TONER_BLACK_VALID: number,
  GXI_TONER_CYAN_VALID: number,
  GXI_TONER_MAGENTA_VALID: number,
  GXI_TONER_YELLOW_VALID: number,
  GXI_IMAGING_BLACK_VALID: number,
  GXI_IMAGING_CYAN_VALID: number,
  GXI_IMAGING_MAGENTA_VALID: number,
  GXI_IMAGING_YELLOW_VALID: number,
  GXI_SUPPORT_PAPER_SETTING: number,
  GXI_INTRAY_MANUALFEEDING_TRAY_SUPPORT: number,
  GXI_INSTALL_OPTION_MULTIBIN: number
}

export interface SynchtruResponse extends GxiInformation {
  status: Status,
  identity: Identity,
  toner_black: Toner,
  toner_cyan: Toner,
  toner_magenta: Toner,
  toner_yellow: Toner,
  drum_black: Drum
  drum_cyan: Drum,
  drum_magenta: Drum,
  drum_yellow: Drum,
  tray1: Tray,
  tray2: Tray,
  tray3: Tray,
  tray4: Tray,
  tray5: Tray,
  mp: Tray,
  manual: Tray,
  multibin: [
    [string, number, number]
  ],
  outputTray: [
    [number, number, string]
  ],
  capability: Capabilities
  options: {
    wlan: number
  }
}

interface SynchtruModelContruction {

}

export class SynchtruModel {
  static from(response: SynchtruResponse): SynchtruModel {
    return new SynchtruModel()
  }

  blackTonerLevel() {
    return 28;
  }

  cyanTonerLevel() {
    return 6;
  }

  magentaTonerLevel() {
    return 56;
  }

  yellowTonerLevel() {
    return 82;
  }

  isOnline() {
    return true;
  }
}