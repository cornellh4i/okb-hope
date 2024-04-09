const AdminReport = () => {
  return (
    <div className="flex flex-col">

      {/* Client/psychiatrist switch header and column categories bar */}
      <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex' }}>
        <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
          <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex' }}>
            <div style={{ color: '#9A9A9A', fontSize: 24, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>Clients </div>
            <div style={{ width: 146, height: 0, border: '4px #9A9A9A solid' }}></div>
          </div>
          <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex' }}>
            <div style={{ color: '#195BA5', fontSize: 24, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>Psychiatrists </div>
            <div style={{ width: 207, height: 0, border: '4px #195BA5 solid' }}></div>
          </div>
        </div>
        <div style={{ alignSelf: 'stretch', height: 70, padding: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
          <div style={{ alignSelf: 'stretch', paddingLeft: 48, paddingRight: 48, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
            <div style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word' }}>Title</div>
            <div style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word' }}>Subject</div>
            <div style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word' }}>Submitted By</div>
            <div style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word' }}>Time Submitted</div>
          </div>
          <div style={{ alignSelf: 'stretch', height: 0, border: '3px black solid' }}></div>
        </div>
      </div>

      

    </div>
  )
}

export default AdminReport;
