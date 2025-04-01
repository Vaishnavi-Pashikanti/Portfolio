// Terminal.js - Interactive terminal component
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Terminal.css';

const Terminal = ({ darkMode }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState([
    {
      type: 'system',
      content: 'Welcome to my portfolio terminal. Type "help" to see available commands.'
    }
  ]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const navigate = useNavigate();

  // Commands dictionary
  const commands = {
    help: () => ({
      type: 'command-output',
      content: (
        <div className="help-output">
          <p>Available commands:</p>
          <ul>
            <li><strong>help</strong> - Show this help message</li>
            <li><strong>about</strong> - View my profile information</li>
            <li><strong>skills</strong> - List my technical skills</li>
            <li><strong>projects</strong> - View my portfolio projects</li>
            <li><strong>project [name]</strong> - View specific project details</li>
            <li><strong>contact</strong> - Get my contact information</li>
            <li><strong>clear</strong> - Clear the terminal</li>
            <li><strong>theme</strong> - Toggle dark/light mode</li>
            <li><strong>github</strong> - Open my GitHub profile</li>
          </ul>
        </div>
      )
    }),
    about: () => {
      navigate('/about');
      return {
        type: 'command-output',
        content: 'Navigating to about page...'
      };
    },
    skills: () => ({
      type: 'command-output',
      content: (
        <div className="skills-output">
          <p>Technical Skills:</p>
          <div className="skills-category">
            <h4>Languages:</h4>
            <p>JavaScript, TypeScript, Python, Java, C++</p>
          </div>
          <div className="skills-category">
            <h4>Frontend:</h4>
            <p>React, Redux, Next.js, HTML5, CSS3, Tailwind CSS</p>
          </div>
          <div className="skills-category">
            <h4>Backend:</h4>
            <p>Node.js, Express, Django, Spring Boot</p>
          </div>
          <div className="skills-category">
            <h4>Database:</h4>
            <p>MongoDB, PostgreSQL, MySQL, Firebase</p>
          </div>
          <div className="skills-category">
            <h4>DevOps:</h4>
            <p>Docker, Kubernetes, AWS, CI/CD, Git</p>
          </div>
        </div>
      )
    }),
    projects: () => {
      navigate('/projects');
      return {
        type: 'command-output',
        content: 'Navigating to projects page...'
      };
    },
    project: (args) => {
      if (!args.length) {
        return {
          type: 'error',
          content: 'Error: Please specify a project name. Try "projects" to see all projects.'
        };
      }
      
      // Here you would implement logic to navigate to a specific project
      return {
        type: 'command-output',
        content: `Opening project: ${args.join(' ')}...`
      };
    },
    contact: () => {
      navigate('/contact');
      return {
        type: 'command-output',
        content: 'Navigating to contact page...'
      };
    },
    clear: () => {
      setOutput([]);
      return null;
    },
    github: () => {
      window.open('https://github.com/yourusername', '_blank');
      return {
        type: 'command-output',
        content: 'Opening GitHub profile...'
      };
    },
    theme: () => {
      // This would call your theme toggle function
      return {
        type: 'command-output',
        content: 'Toggling theme...'
      };
    },
    // Easter egg
    sudo: (args) => {
      if (args.join(' ') === 'make me a sandwich') {
        return {
          type: 'command-output',
          content: 'Okay.'
        };
      } else {
        return {
          type: 'error',
          content: 'Permission denied'
        };
      }
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const inputCommand = input.trim();
    const args = inputCommand.split(' ');
    const command = args.shift().toLowerCase();
    
    setCommandHistory(prev => [inputCommand, ...prev]);
    setHistoryIndex(-1);
    
    const commandOutput = {
      type: 'command-input',
      content: `$ ${inputCommand}`
    };
    
    setOutput(prev => [...prev, commandOutput]);
    
    if (commands[command]) {
      const result = commands[command](args);
      if (result) {
        setOutput(prev => [...prev, result]);
      }
    } else {
      setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: `Command not found: ${command}. Type "help" for available commands.`
        }
      ]);
    }
    
    setInput('');
  };

  const handleKeyDown = (e) => {
    // Up arrow for previous commands
    if (e.key === 'ArrowUp') {
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
    // Down arrow for next commands
    else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
    // Tab completion (simplified)
    else if (e.key === 'Tab') {
      e.preventDefault();
      
      const commandStart = input.toLowerCase();
      const possibleCommands = Object.keys(commands).filter(cmd => 
        cmd.startsWith(commandStart)
      );
      
      if (possibleCommands.length === 1) {
        setInput(possibleCommands[0]);
      }
    }
  };

  // Auto scroll to bottom on new output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Focus the input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={`terminal ${darkMode ? 'terminal-dark' : 'terminal-light'}`}
      onClick={focusInput}
      ref={terminalRef}
    >
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="control close"></span>
          <span className="control minimize"></span>
          <span className="control maximize"></span>
        </div>
        <div className="terminal-title">portfolio ~ terminal</div>
      </div>
      
      <div className="terminal-body">
        {output.map((item, index) => (
          <div key={index} className={`terminal-output ${item.type}`}>
            {item.content}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="terminal-input-line">
          <span className="prompt">visitor@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="terminal-input"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;