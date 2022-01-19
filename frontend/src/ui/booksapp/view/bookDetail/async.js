import { lazy, Suspense } from 'react';
import SkeletonFallback from './fallback';
import { useSelectedBookId } from '../store';
const BookDetail = lazy(() => import('./index'));

export default () => {  
    const [selectedBookId] = useSelectedBookId();
    if (selectedBookId === '') return null;
    return (
        <Suspense fallback={null}>
            <BookDetail />
        </Suspense>
    );
}



