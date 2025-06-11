import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    dnaName: "",
    ens: "",
    twitter: "",
    twitterFollowers: "",
    github: "",
    githubFollowers: "",
    discord: "",
    telegram: "",
    youtube: "",
    youtubeFollowers: "",
  });
  const [showPassport, setShowPassport] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function generatePassport() {
    setShowPassport(true);
  }

  // Suma total de seguidores (solo YouTube, Twitter, GitHub)
  const totalFollowers =
    Number(form.youtubeFollowers || 0) +
    Number(form.twitterFollowers || 0) +
    Number(form.githubFollowers || 0);

  // Determina rango y estrellas (siempre morado)
  let stars = 1, rank = "Bronze";
  if (totalFollowers > 10000) { stars = 2; rank = "Silver"; }
  if (totalFollowers > 50000) { stars = 3; rank = "Gold"; }
  if (totalFollowers > 100000) { stars = 4; rank = "Diamond"; }

  // Avatar DiceBear estilo bottts, usando todos los campos como seed
  const avatarSeed = Object.values(form).join("-");
  const avatarUrl = avatarSeed
    ? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(avatarSeed)}`
    : "";

  return (
    <div className="main-bg">
      <div className="logo">🧬</div>
      <div className="title">HEXDNA</div>
      <div className="subtitle">Your unified digital passport</div>
      {!showPassport ? (
        <>
          <div className="inputs-grid">
            <div className="input-card youtube">
              <span className="icon">📺</span>
              <input
                className="input"
                name="youtube"
                placeholder="YouTube"
                value={form.youtube}
                onChange={handleChange}
              />
              <input
                className="input followers"
                name="youtubeFollowers"
                type="number"
                min="0"
                placeholder="Subscribers"
                value={form.youtubeFollowers}
                onChange={handleChange}
              />
            </div>
            <div className="input-card github">
              <span className="icon">💻</span>
              <input
                className="input"
                name="github"
                placeholder="GitHub"
                value={form.github}
                onChange={handleChange}
              />
              <input
                className="input followers"
                name="githubFollowers"
                type="number"
                min="0"
                placeholder="Followers"
                value={form.githubFollowers}
                onChange={handleChange}
              />
            </div>
            <div className="input-card twitter">
              <span className="icon">🐦</span>
              <input
                className="input"
                name="twitter"
                placeholder="Twitter"
                value={form.twitter}
                onChange={handleChange}
              />
              <input
                className="input followers"
                name="twitterFollowers"
                type="number"
                min="0"
                placeholder="Followers"
                value={form.twitterFollowers}
                onChange={handleChange}
              />
            </div>
            <div className="input-card discord">
              <span className="icon">🎮</span>
              <input
                className="input"
                name="discord"
                placeholder="Discord"
                value={form.discord}
                onChange={handleChange}
              />
            </div>
            <div className="input-card telegram">
              <span className="icon">💬</span>
              <input
                className="input"
                name="telegram"
                placeholder="Telegram"
                value={form.telegram}
                onChange={handleChange}
              />
            </div>
            <div className="input-card ens">
              <span className="icon">🌐</span>
              <input
                className="input"
                name="ens"
                placeholder="ENS (yourname.eth)"
                value={form.ens}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="dna-card-wrapper">
            <div className="input-card dna">
              <span className="icon">🧬</span>
              <input
                className="input"
                name="dnaName"
                placeholder="Choose your name.dna"
                value={form.dnaName}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
          <button
            className="button generate-btn"
            onClick={generatePassport}
            disabled={!form.dnaName}
          >
            Generate Passport
          </button>
        </>
      ) : (
        <>
          <div className="passport-dni">
            <div className="passport-dni-header">
              <img src={avatarUrl} alt="Avatar" className="passport-dni-avatar" />
              <div>
                <div className="passport-dni-name">{form.dnaName}.dna</div>
                <div className="passport-dni-rank">{rank}</div>
              </div>
            </div>
            <div className="passport-dni-info">
              <div>
                <span className="passport-dni-label">YouTube:</span> <span>{form.youtube}</span>
              </div>
              <div className="passport-dni-followers">{form.youtubeFollowers} subscribers</div>
              <div>
                <span className="passport-dni-label">GitHub:</span> <span>{form.github}</span>
              </div>
              <div className="passport-dni-followers">{form.githubFollowers} followers</div>
              <div>
                <span className="passport-dni-label">Twitter:</span> <span>{form.twitter}</span>
              </div>
              <div className="passport-dni-followers">{form.twitterFollowers} followers</div>
              <div>
                <span className="passport-dni-label">Discord:</span> <span>{form.discord}</span>
              </div>
              <div>
                <span className="passport-dni-label">Telegram:</span> <span>{form.telegram}</span>
              </div>
              <div>
                <span className="passport-dni-label">ENS:</span> <span>{form.ens}</span>
              </div>
            </div>
            <div className="passport-dni-stars">
              {Array.from({ length: stars }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
          <button
            className="button generate-btn"
            style={{ marginTop: "1.5rem", background: "#222" }}
            onClick={() => setShowPassport(false)}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}