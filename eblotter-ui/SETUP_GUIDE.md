# eBlotter UI - Quick Setup Guide

## Installation & Running

### 1. Install Dependencies
```bash
cd eblotter-ui
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.development
```

Edit `.env.development`:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_AG_GRID_LICENSE_KEY=your_license_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

App runs on: **http://localhost:3000**

### 4. Start Backend (Optional)
In a separate terminal:
```bash
cd ../eblotter-api
# Follow backend setup instructions
```

## What Changed (Refactoring Summary)

### ✅ Improvements Made
1. **Updated Dependencies**
   - Removed unused: MUI Material, Emotion (~7MB saved)
   - Added: axios, zustand, zod
   - Updated: AG-Grid to 34.3.0, Vite to 7.1.12

2. **TypeScript Path Aliases**
   - Use `@/components` instead of `../../components`
   - Cleaner, more maintainable imports

3. **API Integration**
   - Created service layer for backend calls
   - Axios client with interceptors
   - Error handling built-in

4. **State Management**
   - Zustand stores for deals, portfolios, brokers
   - Loading and error states
   - Type-safe actions

5. **Better UX**
   - Error boundary for crash prevention
   - Loading spinners
   - Toast notifications (replaced alerts)
   - Fixed empty Home page

6. **Code Quality**
   - Stricter ESLint rules
   - No `any` types allowed
   - Better TypeScript typing

## Quick Tour

### Home Page
Navigate to: `http://localhost:3000`
- Dashboard with feature cards
- Links to all sections

### Deal Management
Navigate to: `http://localhost:3000/deal`
- Editable data grid
- Export to CSV
- Import data popup
- Real-time updates (if API connected)

### Search
Navigate to: `http://localhost:3000/search`
- Search form
- Deal list view

### Portfolios & Brokers
- `http://localhost:3000/portfolio`
- `http://localhost:3000/broker`

## Using New Features

### Toast Notifications
```typescript
import { toast } from '@/utils/toast';

toast.success('Saved successfully!');
toast.error('Failed to save');
toast.warning('Please check inputs');
toast.info('Loading from cache');
```

### State Management
```typescript
import { useDealStore } from '@/store/useDealStore';

const { deals, isLoading, fetchDeals } = useDealStore();

useEffect(() => {
  fetchDeals();
}, []);
```

### API Services
```typescript
import { dealService } from '@/services/dealService';

const deals = await dealService.getAll();
await dealService.create({ /* data */ });
```

## Build & Deploy

```bash
# Build for production
npm run build

# Output in ./dist
# Preview build
npm run preview
```

## Troubleshooting

**Problem**: "Failed to load deals from server"
- **Solution**: Backend API not running or wrong URL in .env

**Problem**: AG-Grid shows watermark
- **Solution**: Add valid license key or use Community edition

**Problem**: TypeScript errors with `@/` imports
- **Solution**: Restart your IDE/editor

## Next Steps

1. ✅ All dependencies updated
2. ✅ TypeScript configured with path aliases
3. ✅ API service layer created
4. ✅ State management implemented
5. ✅ Error handling added
6. ✅ Home page fixed
7. ✅ Build successful

### Recommended Next Steps:
- Connect backend API
- Add authentication
- Write unit tests
- Add more form validation
- Implement remaining API integrations

---

For detailed refactoring notes, see [REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md)
