type ElixirLogoProps = {
  className?: string;
};

export function ElixirLogo({ className = "" }: ElixirLogoProps) {
  return (
    <svg
      viewBox="0 0 520 190"
      className={className}
      role="img"
      aria-label="Elixir logo"
      direction="ltr"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Elixir logo</title>
      <g fill="currentColor">
        <text
          x="20"
          y="145"
          fontFamily="Lalezar, Changa, sans-serif"
          fontSize="150"
          fontWeight="900"
          letterSpacing="0"
          direction="ltr"
          style={{ unicodeBidi: "bidi-override" }}
          transform="rotate(-1 260 95)"
        >
          Elixir
        </text>

        {/* A sprouting leaf grows from the second i, connecting the logo to botany. */}
        <path d="M343 42C350 17 371 8 391 10C387 32 371 48 346 50C355 35 367 24 380 17C364 22 352 30 343 42Z" />
        <path d="M340 48C333 27 318 18 302 19C304 38 317 50 339 53C331 40 322 31 313 26C324 30 333 37 340 48Z" />
        <path d="M341 54C342 39 347 27 355 16H360C350 32 346 45 346 59Z" />

        {/* A liquid drop nested near the x expresses cosmetic chemistry. */}
        <path d="M287 82C287 82 303 102 303 114C303 125 296 132 287 132C278 132 271 125 271 114C271 102 287 82 287 82ZM287 101C282 109 280 113 280 117C280 122 283 125 287 125C291 125 294 122 294 117C294 113 292 109 287 101Z" fillRule="evenodd" />
      </g>
    </svg>
  );
}