import React, { useState } from 'react';
import { StudentUser, DEMO_USERS } from '../../types/auth';
import { CAMPUS_DROP_ZONES } from '../../data/campusData';
import {
  Lock,
  User,
  Mail,
  ShieldCheck,
  X,
  CreditCard,
  Building,
  CheckCircle2,
  KeyRound,
  Plane,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: StudentUser) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Sign Up Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupId, setSignupId] = useState('');
  const [signupDorm, setSignupDorm] = useState('');
  const [signupMealPlan, setSignupMealPlan] = useState<
    'Unlimited Plus' | '14-Meal Weekly Swipes' | 'Dining Dollars Only' | 'None (Card Only)'
  >('14-Meal Weekly Swipes');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupAgree, setSignupAgree] = useState(true);
  const [signupError, setSignupError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter your University email or Student ID, and your password.');
      return;
    }

    // Check if matches a demo user or authenticate
    const foundUser = DEMO_USERS.find(
      (u) =>
        u.email.toLowerCase() === loginEmail.trim().toLowerCase() ||
        u.studentIdNumber.toLowerCase() === loginEmail.trim().toLowerCase()
    );

    if (foundUser) {
      onLoginSuccess(foundUser);
      onClose();
      return;
    }

    // Create ad-hoc student session
    const studentUser: StudentUser = {
      id: `user-${Date.now()}`,
      fullName: loginEmail.split('@')[0].replace('.', ' '),
      email: loginEmail.includes('@') ? loginEmail : `${loginEmail}@university.edu`,
      studentIdNumber: loginEmail.startsWith('U-') ? loginEmail : `U-${Math.floor(100000 + Math.random() * 900000)}`,
      role: 'student',
      campusDormOrBuilding: 'Campus Central Residence Hall',
      mealPlanType: '14-Meal Weekly Swipes',
      diningDollarsBalance: 120.00,
      mealSwipesRemaining: 12,
      preferredDropZoneId: 'pad-lib'
    };

    onLoginSuccess(studentUser);
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (!signupName.trim() || !signupEmail.trim() || !signupId.trim() || !signupPassword.trim()) {
      setSignupError('All fields marked with an asterisk are required.');
      return;
    }

    if (!signupAgree) {
      setSignupError('You must agree to Campus Drone Flight Safety & Air Corridor Regulations.');
      return;
    }

    const newUser: StudentUser = {
      id: `user-${Date.now()}`,
      fullName: signupName.trim(),
      email: signupEmail.trim(),
      studentIdNumber: signupId.trim().toUpperCase(),
      role: 'student',
      campusDormOrBuilding: signupDorm.trim() || 'General Campus Housing',
      mealPlanType: signupMealPlan,
      diningDollarsBalance: signupMealPlan === 'None (Card Only)' ? 0 : 200.00,
      mealSwipesRemaining: signupMealPlan === 'Unlimited Plus' ? 99 : signupMealPlan === '14-Meal Weekly Swipes' ? 14 : 0,
      preferredDropZoneId: 'pad-lib'
    };

    onLoginSuccess(newUser);
    onClose();
  };

  const handleQuickDemoSelect = (demo: StudentUser) => {
    onLoginSuccess(demo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
                <span>CAMPUS IDENTITY ACCESS</span>
                <span>·</span>
                <span>256-BIT SSL PROTECTED</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                {mode === 'login' ? 'University Student Sign In' : 'Create Student Flight Account'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Segmented Tabs */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setLoginError(null);
            }}
            className={`flex-1 py-2 text-center rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Sign In (CAS SSO)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setSignupError(null);
            }}
            className={`flex-1 py-2 text-center rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            New Student Sign Up
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Quick Demo Logins Bar */}
          <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Quick 1-Click Demo Profiles:
              </span>
              <span className="text-[10px] text-amber-700">Instant test</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleQuickDemoSelect(demo)}
                  className="cursor-pointer p-1.5 bg-white border border-amber-200 rounded-lg text-left hover:bg-amber-100/50 transition-colors shadow-2xs"
                >
                  <div className="font-bold text-slate-900 truncate text-[11px]">{demo.fullName}</div>
                  <div className="text-[9px] text-slate-500 font-mono truncate">{demo.studentIdNumber}</div>
                </button>
              ))}
            </div>
          </div>

          {/* MODE 1: SIGN IN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {loginError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
                  {loginError}
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  University Email or Student ID #
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. alex.chen@university.edu or U-9021849"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Campus Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded text-amber-500" />
                  <span>Remember on this campus device</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Campus password reset link dispatched to your student email.')}
                  className="cursor-pointer text-amber-700 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Sign In via University CAS</span>
              </button>
            </form>
          )}

          {/* MODE 2: SIGN UP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              {signupError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
                  {signupError}
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Rivera"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    University Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@university.edu"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Student ID # *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="U-XXXXXXX"
                    value={signupId}
                    onChange={(e) => setSignupId(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Campus Residence / Dormitory Building
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tower Hall Dorms, Room 312"
                  value={signupDorm}
                  onChange={(e) => setSignupDorm(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Campus Dining Meal Plan Tier
                </label>
                <select
                  value={signupMealPlan}
                  onChange={(e) => setSignupMealPlan(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white text-slate-800"
                >
                  <option value="14-Meal Weekly Swipes">14-Meal Weekly Swipes (10% Drone Discount)</option>
                  <option value="Unlimited Plus">Unlimited Plus (Full Access + $240 Dining Dollars)</option>
                  <option value="Dining Dollars Only">Dining Dollars Only (Commuter Account)</option>
                  <option value="None (Card Only)">None (Credit/Debit Card Only)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={signupAgree}
                    onChange={(e) => setSignupAgree(e.target.checked)}
                    className="mt-0.5 rounded text-amber-500"
                  />
                  <span>
                    I agree to the University Drone Delivery Safety Protocol and will retrieve my meal promptly at designated landing pads.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Student Registration</span>
              </button>
            </form>
          )}

          {/* Security Assurance Footer */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5 text-[10px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Your student credentials and meal plan balances are encrypted and verified against the University Registrar database.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
