import { useRef, useEffect } from "react";
import vw1 from '../../assets/Account/vw1.jpg';

export const SignIn = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ["#ffec70", "#ff7170", "#70cfff", "#b370ff", "#fff", "#ffb370", "#70ffb3"];
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
    const randomBetween = (a: number, b: number) => a + Math.random() * (b - a);

    class Particle {
      x: number; y: number; vx: number; vy: number; alpha: number; color: string; size: number;
      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = randomBetween(0, Math.PI * 2);
        const speed = randomBetween(2, 6);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.size = randomBetween(1.5, 3.5);
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.03;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.alpha -= 0.012;
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = Math.max(this.alpha, 0);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      x: number; y: number; tx: number; ty: number; color: string; speed: number; state: 'fly' | 'burst'; particles: Particle[];
      constructor() {
        this.x = randomBetween(width * 0.2, width * 0.8);
        this.y = height;
        this.tx = this.x + randomBetween(-80, 80);
        this.ty = randomBetween(height * 0.15, height * 0.45);
        this.color = randomColor();
        this.speed = randomBetween(6, 9);
        this.state = 'fly';
        this.particles = [];
      }
      update() {
        if (this.state === 'fly') {
          const dx = (this.tx - this.x) * 0.08;
          const dy = (this.ty - this.y) * 0.08;
          this.x += dx;
          this.y += dy;
          if (Math.abs(this.y - this.ty) < 12) {
            this.state = 'burst';
            for (let i = 0; i < randomBetween(18, 28); i++) {
              this.particles.push(new Particle(this.x, this.y, randomColor()));
            }
          }
        } else {
          this.particles.forEach((p) => p.update());
        }
      }
      draw(ctx: CanvasRenderingContext2D) {
        if (this.state === 'fly') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        } else {
          this.particles.forEach((p) => p.draw(ctx));
        }
      }
      isDone() {
        return this.state === 'burst' && this.particles.every((p) => p.alpha <= 0);
      }
    }

    let fireworks: Firework[] = [];
    let animationId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      if (Math.random() < 0.07) {
        fireworks.push(new Firework());
      }
      fireworks.forEach((fw) => {
        fw.update();
        fw.draw(ctx);
      });
      fireworks = fireworks.filter((fw) => !fw.isDone());
      animationId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (!canvas || !ctx) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b] text-[#160d0b]">
      {/* Fireworks Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Main SignIn Card */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl rounded-2xl overflow-hidden backdrop-blur-lg shadow-2xl border border-[#a3a4a1]">
        {/* Left Side Image */}
        <div
          className="hidden md:flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${vw1})` }}
        >
        </div>

        {/* Right Side Form */}
        <form className="p-8 bg-white/40 dark:bg-gray-600/30 backdrop-blur-lg space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
              Welcome to CarGuru!
            </h2>
            <p className="text-[#d6d4ce] text-base font-medium">
              Log in to start your engine
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#c2c0ba]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. you@example.com"
                className="w-full h-12 px-4 rounded-lg border bg-white/70 text-[#160d0b] placeholder-[#a3a4a1] border-[#bca16a] focus:border-[#888372] shadow-inner focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#b9b7af]">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-lg border bg-white/70 text-[#3c3e1f] placeholder-[#a3a4a1] border-[#bca16a] focus:border-[#888372] shadow-inner focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-lg font-bold text-white rounded-md bg-gradient-to-r from-[#bca16a] via-[#a3a4a1] to-[#666037] hover:scale-105 hover:shadow-xl transition-transform shadow-lg"
            >
              Log In
            </button>
          </div>

          <div className="flex flex-col items-center mt-4 gap-2 text-sm">
            <a href="/forgotpassword" className="text-[#bca16a] hover:underline">Forgot password?</a>
            <a href="/register" className="text-[#160d0b] hover:underline">Need an account? Register</a>
            <a href="/" className="text-[#888372] hover:underline">HomePage</a>
          </div>
        </form>
      </div>
    </div>
  );
};
