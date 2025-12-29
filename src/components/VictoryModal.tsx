import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './VictoryModal.css';

interface VictoryModalProps {
    show: boolean;
    timeString: string;
    onClose: () => void;
    onViewSolution: () => void;
}

const VictoryModal: React.FC<VictoryModalProps> = ({
    show,
    timeString,
    onClose,
    onViewSolution
}) => {
    const [shareStatus, setShareStatus] = useState<string>('');

    const handleShare = async () => {
        const shareText = `I solved today's Ananagrams puzzle in ${timeString}! Can you beat my time?\nhttps://mviol42.github.io/ananagrams`;
        const shareData = {
            title: 'Ananagrams',
            text: shareText,
        };

        // Check if Web Share API is available (iOS Safari, Android Chrome, etc.)
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                setShareStatus('Shared!');
                setTimeout(() => setShareStatus(''), 2000);
            } catch (err) {
                // User cancelled or error
                if ((err as Error).name !== 'AbortError') {
                    setShareStatus('Could not share');
                    setTimeout(() => setShareStatus(''), 2000);
                }
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(shareText);
                setShareStatus('Copied to clipboard!');
                setTimeout(() => setShareStatus(''), 2000);
            } catch (err) {
                // Clipboard API not available
                setShareStatus('Could not copy');
                setTimeout(() => setShareStatus(''), 2000);
            }
        }
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            className="victory-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Puzzle Solved!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <div className="victory-emoji">&#127881;</div>
                <p className="victory-time">
                    You completed today's puzzle in <strong>{timeString}</strong>!
                </p>
                {shareStatus && <p className="share-status">{shareStatus}</p>}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <button
                    className="button"
                    onClick={onViewSolution}
                >
                    View Solution
                </button>
                <button
                    className="validate-button"
                    onClick={handleShare}
                >
                    Share Time
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default VictoryModal;
