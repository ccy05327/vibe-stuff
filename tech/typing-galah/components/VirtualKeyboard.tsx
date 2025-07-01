interface VirtualKeyboardProps {
  currentKey: string | null
  pressedKeys?: string[]
}

export default function VirtualKeyboard({ currentKey, pressedKeys = [] }: VirtualKeyboardProps) {
  const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ]

  const getKeyClass = (key: string) => {
    let className = 'key'
    
    if (currentKey === key || (currentKey === ' ' && key === 'space')) {
      className += ' key-active'
    } else if (pressedKeys.includes(key)) {
      className += ' key-error'
    }
    
    return className
  }

  const getKeyDisplay = (key: string) => {
    switch(key) {
      case ' ':
        return 'SPACE'
      case "'":
        return "'"
      default:
        return key.toUpperCase()
    }
  }

  return (
    <div className="virtual-keyboard">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-galah-grey-dark mb-2">
          Virtual Keyboard
        </h3>
        <p className="text-sm text-galah-grey-mid">
          {currentKey ? (
            <>Next key: <span className="font-mono font-bold text-galah-pink-vibrant">{getKeyDisplay(currentKey)}</span></>
          ) : (
            'Well done! 🎉'
          )}
        </p>
      </div>

      <div className="space-y-2">
        {/* Number row */}
        <div className="flex justify-center space-x-1">
          {keyboardLayout[0].map((key) => (
            <div
              key={key}
              className={`${getKeyClass(key)} w-8 h-8 flex items-center justify-center text-xs`}
            >
              {getKeyDisplay(key)}
            </div>
          ))}
        </div>

        {/* QWERTY row */}
        <div className="flex justify-center space-x-1">
          {keyboardLayout[1].map((key) => (
            <div
              key={key}
              className={`${getKeyClass(key)} w-8 h-8 flex items-center justify-center text-xs`}
            >
              {getKeyDisplay(key)}
            </div>
          ))}
        </div>

        {/* ASDF row (home row) */}
        <div className="flex justify-center space-x-1">
          {keyboardLayout[2].map((key) => (
            <div
              key={key}
              className={`${getKeyClass(key)} w-8 h-8 flex items-center justify-center text-xs ${
                ['f', 'j'].includes(key) ? 'ring-2 ring-galah-pink-soft' : ''
              }`}
            >
              {getKeyDisplay(key)}
            </div>
          ))}
        </div>

        {/* ZXCV row */}
        <div className="flex justify-center space-x-1">
          {keyboardLayout[3].map((key) => (
            <div
              key={key}
              className={`${getKeyClass(key)} w-8 h-8 flex items-center justify-center text-xs`}
            >
              {getKeyDisplay(key)}
            </div>
          ))}
        </div>

        {/* Space bar */}
        <div className="flex justify-center">
          <div
            className={`${getKeyClass(' ')} w-48 h-8 flex items-center justify-center text-xs`}
          >
            SPACE
          </div>
        </div>
      </div>

      {/* Finger guide */}
      <div className="mt-4 text-center">
        <div className="text-xs text-galah-grey-mid">
          <p className="mb-2">
            <span className="inline-block w-3 h-3 bg-galah-pink-soft rounded-full mr-2"></span>
            Home row keys (F & J) - anchor fingers here
          </p>
          <p className="text-xs">
            Use the correct finger for each key and return to home row after each keystroke
          </p>
        </div>
      </div>
    </div>
  )
} 