const INSTRUMENT_ICONS = {
  vocals: '🎤',
  'acoustic guitar': '🎸',
  'electric guitar': '🎸',
  bass: '🎸',
  drums: '🥁',
  keyboard: '🎹',
  saxophone: '🎷',
  trumpet: '🎺',
  violin: '🎻',
}

export function Participants({ participants = [], compact = false }) {
  if (compact) {
    return (
      <span className="user-chip">
        <span className="user-chip-dot" />
        {participants.length} online
      </span>
    )
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
        In the room ({participants.length})
      </h3>
      {participants.length === 0 ? (
        <p className="text-zinc-500">No one here yet…</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => (
            <span key={p._id} className="user-chip capitalize">
              <span>{INSTRUMENT_ICONS[p.instrument] || '🎵'}</span>
              {p.userName || 'Musician'}
              {p.isAdmin && <span className="badge-admin">admin</span>}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
