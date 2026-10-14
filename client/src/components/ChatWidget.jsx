import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Fab,
  IconButton,
  InputBase,
  Paper,
  Slide,
  Stack,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToyOutlined";
import useAuth from "../auth";

// Change this to your backend route.


const {request}=useAuth();

const SUGGESTIONS = [
  "What tasks are overdue?",
  "Summarize this week's progress",
  "Create a task for me",
];

const WELCOME = {
  id: "welcome",
  role: "assistant",
  content: "Hi! I can answer questions about your projects and tasks. What do you need?",
};

/**
 * Calls your backend. Expected response shape:
 *   { reply: string, pendingAction?: { id: string, summary: string } }
 * `pendingAction` is for write operations that need the user to confirm first.
 */
async function sendToBackend(messages, confirmActionId) {
//   const res = await fetch(CHAT_API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include", // send your auth cookie/session
//     body: JSON.stringify({
//       messages: messages
//         .filter((m) => m.id !== "welcome")
//         .map(({ role, content }) => ({ role, content })),
//       confirmActionId,
//     }),
//   });


    const res=await request.post('/chat',{messages: messages
        .filter((m) => m.id !== "welcome")
        .map(({ role, content }) => ({ role, content })),
      confirmActionId,
    })
//   if (!res.ok) throw new Error(`Request failed (${res.status})`);
 
        return res.data.reply;
}

function MessageBubble({ message, onConfirm, onCancel, disabled }) {
  const isUser = message.role === "user";
  return (
    <Stack
      direction={isUser ? "row-reverse" : "row"}
      spacing={1}
      alignItems="flex-start"
      sx={{ mb: 1.5 }}
    >
      {!isUser && (
        <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main" }}>
          <SmartToyIcon sx={{ fontSize: 18 }} />
        </Avatar>
      )}
      <Box sx={{ maxWidth: "80%" }}>
        <Paper
          elevation={0}
          sx={{
            px: 1.5,
            py: 1,
            borderRadius: 2,
            bgcolor: isUser
              ? "primary.main"
              : message.error
              ? "error.light"
              : "action.hover",
            color: isUser ? "primary.contrastText" : "text.primary",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          <Typography variant="body2">{message.content}</Typography>
        </Paper>

        {message.pendingAction && (
          <Paper variant="outlined" sx={{ mt: 1, p: 1.5, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Confirm this change
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {message.pendingAction.summary}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="contained"
                disabled={disabled}
                onClick={() => onConfirm(message.pendingAction.id)}
              >
                Confirm
              </Button>
              <Button size="small" disabled={disabled} onClick={onCancel}>
                Cancel
              </Button>
            </Stack>
          </Paper>
        )}
      </Box>
    </Stack>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const addAssistantMessage = (data) =>
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        pendingAction: data.pendingAction,
      },
    ]);

  const run = async (history, confirmActionId) => {
    setLoading(true);
    try {
      addAssistantMessage(await sendToBackend(history, confirmActionId));
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          error: true,
          content: "Couldn't reach the assistant. Check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (text = input) => {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { id: crypto.randomUUID(), role: "user", content }];
    setMessages(next);
    setInput("");
    run(next);
  };

  const handleConfirm = (actionId) => {
    // Clear the pending card so it can't be confirmed twice.
    const cleared = messages.map((m) => ({ ...m, pendingAction: undefined }));
    const next = [...cleared, { id: crypto.randomUUID(), role: "user", content: "Confirm" }];
    setMessages(next);
    run(next, actionId);
  };

  const handleCancel = () =>
    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, pendingAction: undefined })),
      { id: crypto.randomUUID(), role: "assistant", content: "Okay, I didn't make any changes." },
    ]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length === 1;

  return (
    <>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={8}
          role="dialog"
          aria-label="Project assistant"
          sx={{
            position: "fixed",
            bottom: 88,
            right: 24,
            width: { xs: "calc(100vw - 32px)", sm: 380 },
            height: { xs: "70vh", sm: 520 },
            maxHeight: "calc(100vh - 112px)",
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            zIndex: (t) => t.zIndex.modal,
          }}
        >
          {/* Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1.25, bgcolor: "primary.main", color: "primary.contrastText" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <SmartToyIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>
                Project assistant
              </Typography>
            </Stack>
            <IconButton size="small" color="inherit" onClick={() => setOpen(false)} aria-label="Close chat">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          {/* Messages */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                disabled={loading}
              />
            ))}

            {showSuggestions && (
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                {SUGGESTIONS.map((s) => (
                  <Chip key={s} label={s} variant="outlined" size="small" onClick={() => handleSend(s)} />
                ))}
              </Stack>
            )}

            {loading && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="caption" color="text.secondary">
                  Thinking…
                </Typography>
              </Stack>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* Input */}
          <Stack
            direction="row"
            alignItems="flex-end"
            spacing={1}
            sx={{ p: 1.5, borderTop: 1, borderColor: "divider" }}
          >
            <InputBase
              multiline
              maxRows={4}
              fullWidth
              placeholder="Ask about your projects…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              inputProps={{ "aria-label": "Message" }}
              sx={{ px: 1.5, py: 0.75, bgcolor: "action.hover", borderRadius: 2, fontSize: 14 }}
            />
            <IconButton
              color="primary"
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </Paper>
      </Slide>

      <Fab
        color="primary"
        aria-label={open ? "Close assistant" : "Open assistant"}
        onClick={() => setOpen((o) => !o)}
        sx={{ position: "fixed", bottom: 24, right: 24, zIndex: (t) => t.zIndex.modal }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </>
  );
}
