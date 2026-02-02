export default function Head() {
  const SITE_URL = "https://valentine-one-zeta.vercel.app";
  const title = "Valentine?";
  const description = "Will you be my Valentine? 💘";
  const image = `${SITE_URL}/og.png`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="icon" href="/valentine.ico" />
      <link rel="apple-touch-icon" href="/valentine.ico" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
