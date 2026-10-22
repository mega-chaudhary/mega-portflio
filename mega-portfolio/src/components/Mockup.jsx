/** Device frames for real screenshots. */
export function Browser({ src, url = '', dark = false, alt = '', video, poster, eager }) {
  return (
    <div className={`browser ${dark ? 'dark' : ''}`}>
      <div className="browser-bar">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="browser-url">{url}</span>
        <span style={{ width: 42 }} />
      </div>
      {video
        ? <video src={video} poster={poster} autoPlay muted loop playsInline />
        : <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable="false" />}
    </div>
  );
}

export function Phone({ src, alt = '', video, poster, style, eager }) {
  return (
    <div className="phone" style={style}>
      <div className="phone-screen">
        <span className="phone-island" aria-hidden="true" />
        {video
          ? <video src={video} poster={poster} autoPlay muted loop playsInline />
          : <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable="false" />}
      </div>
    </div>
  );
}
